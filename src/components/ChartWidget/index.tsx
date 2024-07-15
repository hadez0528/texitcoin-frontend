import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
  height?: number;
  type?:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap';
  card?: boolean;
};

export default function ChartWidget({
  title,
  subheader,
  chart,
  type,
  height,
  card,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.main, theme.palette.warning.main];

  const chartOptions = useChart({
    colors: chartColors,
    xaxis: { categories: chart.categories },
    tooltip: {
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const category = w.globals.categoryLabels.length
          ? w.globals.categoryLabels[dataPointIndex]
          : w.globals.labels[dataPointIndex];
        const legend = w.globals.seriesNames[seriesIndex];
        const color = w.globals.colors[seriesIndex];

        return `<div style="background: #ffffff;">
          <div style="background: #f4f6f8; color: #637381; font-weight: bold; padding: 5px 10px;">${category}</div>
          <div style="display: flex; padding: 10px;">
          <div style="margin-right: 8px; width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; margin-top: 4px;">
          </div>
          <div><span style="color: #637381; margin-right: 5px;">${legend}:</span> <span style="font-weight: bold;">${data}</span></div></div>
        </div>`;
      },
    },
    ...chart.options,
  });

  const currentSeries = chart.series;

  return (
    <>
      {card ? (
        <Chart
          type={type ?? 'area'}
          series={currentSeries}
          options={chartOptions}
          height={height ?? 320}
          sx={{ py: 2.5, pl: 1, pr: 2.5 }}
        />
      ) : (
        <Card {...other}>
          <CardHeader title={title} subheader={subheader} />

          <Chart
            type={type ?? 'area'}
            series={currentSeries}
            options={chartOptions}
            height={height ?? 320}
            sx={{ py: 2.5, pl: 1, pr: 2.5 }}
          />
        </Card>
      )}
    </>
  );
}
