export type FrameGeometry = {
  width: number;
  height: number;
  heroBottom: number;
  demoRight: number;
  band: number;
};

export function buildHomepageFrame(geometry: FrameGeometry, viewportHeight?: number) {
  const { width, height, heroBottom, demoRight, band } = geometry;
  if (!Object.values(geometry).every((value) => Number.isFinite(value) && value > 0)) return null;

  const radius = Math.max(48, band * 2.5);
  const bendX = Math.max(6.5 * band, width - 3.5 * band - demoRight + 2 * band);
  // Preserve the hidden endpoint; flatten the turn when a circle would start above the page.
  const bendY = Math.min(bendX, heroBottom - 5.5 * band);
  if (bendY <= 0 || height - heroBottom < 2 * radius + 2.5 * band) return null;
  const entryX = width - 3.5 * band - bendX;
  let fill = '';

  const ribbons = Array.from({ length: 4 }, (_, index) => {
    const left = (index + 0.5) * band;
    const right = width - (3.5 - index) * band;
    const crossY = heroBottom - (4 - index) * band;
    const entryY = crossY - 1.5 * band;
    const rx = bendX + index * band;
    const ry = bendY + index * band;
    const leftRadius = radius + (3 - index) * band;
    const bottomY = height - (index + 0.5) * band;
    const startY = Math.max(0, entryY - ry);
    const lowerPath = `H ${left + leftRadius}
      A ${leftRadius} ${leftRadius} 0 0 0 ${left} ${crossY + leftRadius}
      V ${bottomY - leftRadius}
      A ${leftRadius} ${leftRadius} 0 0 0 ${left + leftRadius} ${bottomY}
      H ${width}`;

    if (index === 3) {
      fill = `M ${left + leftRadius} ${crossY} ${lowerPath}
        V ${heroBottom} H ${left + leftRadius} Z`;
    }

    let duration: number | undefined;
    if (viewportHeight !== undefined) {
      // Ramanujan's ellipse perimeter approximation, divided into a quarter turn.
      const turnLength = rx === ry ? Math.PI * rx / 2
        : Math.PI / 4 * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
      const length = startY + turnLength
        + Math.hypot(entryX - left - leftRadius, crossY - entryY)
        + Math.PI * leftRadius + bottomY - crossY - 2 * leftRadius
        + width - left - leftRadius;
      duration = length / Math.max(viewportHeight, 1);
    }

    return {
      path: `M ${right} 0 V ${startY}
        A ${rx} ${ry} 0 0 1 ${entryX} ${entryY}
        L ${left + leftRadius} ${crossY} ${lowerPath}`,
      duration
    };
  });

  const cornerRadius = radius + band * 3.5;
  return {
    ribbons,
    fill,
    corner: `M 0 ${height - cornerRadius} V ${height} H ${cornerRadius}
      A ${cornerRadius} ${cornerRadius} 0 0 1 0 ${height - cornerRadius} Z`
  };
}
