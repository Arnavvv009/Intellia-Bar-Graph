import React from 'react';

// ---- 3D Vector Math Utilities (same approach as the shape-viewer engine) ----
function rotateY(point, angleRad) {
  const [x, y, z] = point;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return [x * cos - z * sin, y, x * sin + z * cos];
}

function rotateX(point, angleRad) {
  const [x, y, z] = point;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(point, width, height, scale) {
  const [x, y] = point;
  const cx = width / 2;
  const cy = height / 2 + height * 0.18;
  return [cx + x * scale, cy - y * scale];
}

function isFaceVisible(p0, p1, p2) {
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) > 0;
}

function shadeColor(hex, percent) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.min(255, Math.max(0, Math.round(r + (percent / 100) * 255)));
  g = Math.min(255, Math.max(0, Math.round(g + (percent / 100) * 255)));
  b = Math.min(255, Math.max(0, Math.round(b + (percent / 100) * 255)));
  return `rgb(${r},${g},${b})`;
}

/**
 * BarGraph3D — renders a rotatable, highlight-able 3D bar chart.
 * Parallel component to the old Shape3D.jsx, but for bar-graph anatomy.
 */
export default function BarGraph3D({
  data = [],
  maxScale = 10,
  scaleStep = 2,
  title = '',
  xLabel = '',
  yLabel = '',
  highlight = null, // 'title' | 'scale' | 'bars' | 'labels'
  rotationX = -20,
  rotationY = 18,
  size = 240,
  onBarClick = null,
  tallyMode = null, // 'bars'
  activeTallyList = [],
  showValues = false,
}) {
  const width = size * 1.35;
  const height = size;
  const scale = size * 0.052;
  const angleRadX = (rotationX * Math.PI) / 180;
  const angleRadY = (rotationY * Math.PI) / 180;

  const n = data.length || 1;
  const barW = 1.5;
  const barD = 1.5;
  const gap = 0.8;
  const totalW = n * (barW + gap) - gap;
  const startX = -totalW / 2 + barW / 2;
  const heightScale = 9 / maxScale; // world-units for the tallest possible bar

  const transform = (p) => {
    let r = rotateY(p, angleRadY);
    r = rotateX(r, angleRadX);
    return r;
  };

  const polys = [];

  // ---- Floor plate ----
  {
    const fw = totalW / 2 + 1.4;
    const floorPts3D = [
      [-fw, 0, -1.4],
      [fw, 0, -1.4],
      [fw, 0, 1.4],
      [-fw, 0, 1.4],
    ].map(transform);
    const projected = floorPts3D.map((p) => project(p, width, height, scale));
    const avgZ = floorPts3D.reduce((a, p) => a + p[2], 0) / 4;
    polys.push({ pts: projected, fill: 'rgba(255,255,255,0.03)', stroke: 'rgba(255,255,255,0.06)', z: avgZ - 999, key: 'floor' });
  }

  // ---- Gridlines (scale) ----
  for (let s = 0; s <= maxScale; s += scaleStep) {
    const gy = s * heightScale;
    const gw = totalW / 2 + 1.4;
    const linePts3D = [
      [-gw, gy, -1.4],
      [gw, gy, -1.4],
    ].map(transform);
    const projected = linePts3D.map((p) => project(p, width, height, scale));
    const avgZ = linePts3D.reduce((a, p) => a + p[2], 0) / 2;
    
    if (s > 0) {
      polys.push({
        pts: projected,
        line: true,
        stroke: highlight === 'scale' ? 'rgba(255,190,26,0.55)' : 'rgba(255,255,255,0.07)',
        z: avgZ - 500,
        key: `grid-${s}`,
        dash: highlight === 'scale' ? '3 3' : '2 4',
      });
    }

    // Render the scale number label slightly to the left of the left-most grid point
    const labelPos3D = transform([-gw - 0.7, gy, -1.4]);
    const labelProj = project(labelPos3D, width, height, scale);
    polys.push({
      key: `scale-label-${s}`,
      textLabel: `${s}`,
      x: labelProj[0],
      y: labelProj[1] + 3.5, // vertical adjustment for text alignment
      z: labelPos3D[2] + 500,
      strong: highlight === 'scale',
      dim: highlight !== null && highlight !== 'scale',
    });
  }

  // ---- Axes (Y and X) ----
  {
    const gw = totalW / 2 + 1.2;
    const yAxis3D = [[-gw, 0, -1.3], [-gw, 10, -1.3]].map(transform);
    const xAxis3D = [[-gw, 0, -1.3], [gw, 0, -1.3]].map(transform);
    const yProj = yAxis3D.map((p) => project(p, width, height, scale));
    const xProj = xAxis3D.map((p) => project(p, width, height, scale));
    const axisColor = highlight === 'title' ? '#ffbe1a' : 'rgba(255,255,255,0.35)';
    const axisW = highlight === 'title' ? 3.5 : 2;
    polys.push({ pts: yProj, line: true, stroke: axisColor, strokeW: axisW, z: 400, key: 'y-axis' });
    polys.push({ pts: xProj, line: true, stroke: axisColor, strokeW: axisW, z: 400, key: 'x-axis' });
  }

  // ---- Bars ----
  data.forEach((bar, i) => {
    const cx = startX + i * (barW + gap);
    const h = Math.max(0.15, bar.value * heightScale);
    const hw = barW / 2;
    const hd = barD / 2;

    const verts = [
      [cx - hw, 0, hd], [cx + hw, 0, hd], [cx + hw, h, hd], [cx - hw, h, hd], // front
      [cx - hw, 0, -hd], [cx + hw, 0, -hd], [cx + hw, h, -hd], [cx - hw, h, -hd], // back
    ];

    const faceDefs = [
      { idx: [0, 1, 2, 3], shift: 14, name: 'front' },
      { idx: [1, 5, 6, 2], shift: -8, name: 'right' },
      { idx: [5, 4, 7, 6], shift: -18, name: 'back' },
      { idx: [4, 0, 3, 7], shift: 6, name: 'left' },
      { idx: [3, 2, 6, 7], shift: 26, name: 'top' },
      { idx: [4, 5, 1, 0], shift: -28, name: 'bottom' },
    ];

    const isCounted = activeTallyList.includes(i);
    let baseColor = bar.color || '#ffbe1a';
    if (highlight === 'bars') baseColor = '#ffbe1a';
    if (isCounted) baseColor = '#22c55e';

    const projectedVerts = verts.map((v) => {
      const r = transform(v);
      return { p: project(r, width, height, scale), z: r[2] };
    });

    faceDefs.forEach((f) => {
      const p0 = projectedVerts[f.idx[0]].p;
      const p1 = projectedVerts[f.idx[1]].p;
      const p2 = projectedVerts[f.idx[2]].p;
      if (!isFaceVisible(p0, p1, p2)) return;
      const pts = f.idx.map((ix) => projectedVerts[ix].p);
      const avgZ = f.idx.reduce((a, ix) => a + projectedVerts[ix].z, 0) / f.idx.length;
      polys.push({
        pts,
        fill: shadeColor(baseColor, f.shift),
        stroke: 'rgba(0,0,0,0.25)',
        z: avgZ,
        key: `bar-${i}-${f.name}`,
        onClick: onBarClick && tallyMode === 'bars' ? () => onBarClick(i) : null,
        clickable: !!(onBarClick && tallyMode === 'bars'),
      });
    });

    // Label anchor at base-front-center, used for text overlay
    const labelAnchor3D = transform([cx, -0.6, hd + 0.1]);
    const labelProj = project(labelAnchor3D, width, height, scale);
    polys.push({
      key: `label-${i}`,
      textLabel: bar.label,
      x: labelProj[0],
      y: labelProj[1],
      z: labelAnchor3D[2] + 300,
      dim: highlight !== null && highlight !== 'labels',
      strong: highlight === 'labels',
    });

    if (showValues || isCounted) {
      const valAnchor3D = transform([cx, h + 0.6, hd]);
      const valProj = project(valAnchor3D, width, height, scale);
      polys.push({
        key: `value-${i}`,
        textLabel: `${bar.value}`,
        x: valProj[0],
        y: valProj[1],
        z: valAnchor3D[2] + 900,
        valueTag: true,
      });
    }
  });

  polys.sort((a, b) => a.z - b.z);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ overflow: 'visible' }}>
      {title && (
        <text x={width / 2} y={16} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--accent-gold)">
          {title}
        </text>
      )}
      {polys.map((el) => {
        if (el.textLabel) {
          return (
            <text
              key={el.key}
              x={el.x}
              y={el.y}
              textAnchor="middle"
              fontSize={el.valueTag ? 13 : 11.5}
              fontWeight={el.strong ? 800 : 700}
              fill={el.valueTag ? '#22c55e' : el.strong ? '#ffbe1a' : el.dim ? 'rgba(255,255,255,0.35)' : 'var(--text-muted-lavender)'}
            >
              {el.textLabel}
            </text>
          );
        }
        if (el.line) {
          return (
            <line
              key={el.key}
              x1={el.pts[0][0]} y1={el.pts[0][1]}
              x2={el.pts[1][0]} y2={el.pts[1][1]}
              stroke={el.stroke}
              strokeWidth={el.strokeW || 1.5}
              strokeDasharray={el.dash || 'none'}
            />
          );
        }
        return (
          <polygon
            key={el.key}
            points={el.pts.map((p) => p.join(',')).join(' ')}
            fill={el.fill}
            stroke={el.stroke}
            strokeWidth="1"
            onClick={el.onClick || undefined}
            style={el.clickable ? { cursor: 'pointer' } : undefined}
          />
        );
      })}
    </svg>
  );
}
