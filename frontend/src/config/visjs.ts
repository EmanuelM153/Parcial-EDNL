export const options = {
  autoResize: true,
  locale: "es",
  nodes: {
    color: "#a855f7",
    fixed: false,
    font: "12px arial black",
    borderWidth: 0,
    scaling: { label: true },
    shadow: true,
  },
  edges: {
    color: "#e879f9",
    font: { size: 10, face: "arial", vadjust: -5 },
    smooth: { type: "continuous" },
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
  },
  interaction: {
    hover: true,
    multiselect: true,
    navigationButtons: true,
  },
};
