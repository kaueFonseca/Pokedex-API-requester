export const lightenColor = (color: string, percent: number)=>{
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const r = (num >> 16) + amt;
    const g = ((num >> 8) & 0x00ff) + amt;
    const b = (num & 0x0000ff) + amt;
  
    return `rgb(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)})`;
}
