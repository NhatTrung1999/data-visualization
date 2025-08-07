type CustomCurveType =
  | 'monotone'
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bumpX'
  | 'bumpY'
  | 'bump'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

type CustomLegendType =
  | 'circle'
  | 'cross'
  | 'diamond'
  | 'line'
  | 'plainline'
  | 'rect'
  | 'square'
  | 'star'
  | 'triangle'
  | 'wye'
  | 'none';

export const lineTypes: CustomCurveType[] = [
  'basis',
  'basisClosed',
  'basisOpen',
  'bumpX',
  'bumpY',
  'bump',
  'linear',
  'linearClosed',
  'natural',
  'monotone',
  'monotoneX',
  'monotoneY',
  'step',
  'stepBefore',
  'stepAfter',
];

export const legendTypes: CustomLegendType[] = [
  'circle',
  'cross',
  'diamond',
  'line',
  'plainline',
  'rect',
  'square',
  'star',
  'triangle',
  'wye',
  'none',
];

export const strokeWidthLines: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
