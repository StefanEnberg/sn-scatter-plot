import createGridLines from './grid-lines';
import createAxes from './axes';
import createAxisTitles from './axis-titles';
import createPoint from './point';
import createHeatMap from './heat-map';
import createHeatMapLabels from './heat-map-labels';
import createReferenceLines from './reference-lines';
import createPointLabels from './point-labels';
import createDisclaimer from './disclaimer';
import createOutOfBounds, { createSpace as createOutOfBoundsSpace } from './out-of-bounds';
import createHeatMapLegend from './heat-map-legend';
import createNavigationPanel from './navigation-panel';
import createMiniChart from './mini-chart';
import createHeatMapHighLight from './heat-map-highlight';

export default function createComponents({ context, models, picasso, chart, actions, animationsEnabled }) {
  const { colorService, disclaimerModel, layoutService, themeService, chartModel, trendLinesService, tooltipService } =
    models;
  const disclaimer = createDisclaimer({ disclaimerModel, context, layoutService, themeService, picasso });

  if (disclaimerModel.query.getHasSuppressingDisclaimer()) {
    return [disclaimer];
  }

  const components = [
    ...createOutOfBoundsSpace({ models }),
    createGridLines(models, animationsEnabled),
    ...createReferenceLines({ models, context, animationsEnabled }),
    createPoint({ models, chart, animationsEnabled }),
    createHeatMap(chartModel, animationsEnabled),
    createHeatMapHighLight({ chartModel, layoutService, actions, context }),
    ...trendLinesService.getComponents(),
    ...createAxes({ models, animationsEnabled }),
    ...createAxisTitles({ models, context }),
    createPointLabels({ models, animationsEnabled }),
    createOutOfBounds({ models, context, chart }),
    ...colorService.custom.legendComponents(),
    createHeatMapLegend({ models, context, chart }),
    disclaimer,
    createHeatMapLabels({ themeService, chartModel, picasso, context, animationsEnabled }),
    ...createNavigationPanel({ models, chart, actions, context }),
    ...createMiniChart({ models, context }),
    ...tooltipService.getComponents(),
  ].filter(Boolean);
  // setDisplayOrder(components);

  return components;
}
