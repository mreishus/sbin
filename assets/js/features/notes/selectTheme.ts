const theme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    neutral0: "#19283d",
    neutral5: "#20334d",
    neutral10: "#2a4365",
    neutral20: "#2d3748",
    neutral30: "#4a5568",
    neutral40: "#718096",
    neutral50: "#a0aec0",
    neutral60: "#cbd5e0",
    neutral70: "#e2e8f0",
    neutral80: "#edf2f7",
    neutral90: "#f7fafc",
    primary: "#ebf8ff",
    primary75: "#90cdf4",
    primary50: "#4299e1",
    primary25: "#2b6cb0",
  },
});

export default theme;
