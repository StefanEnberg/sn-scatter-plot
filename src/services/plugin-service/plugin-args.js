import KEYS from '../../constants/keys';

export default function getPluginArgs(layoutService) {
  return {
    layout: layoutService.getLayout(),
    keys: {
      scales: {
        x: KEYS.SCALE.X,
        y: KEYS.SCALE.Y,
      },
      components: {
        'x-axis': KEYS.COMPONENT.X_AXIS,
        'y-axis': KEYS.COMPONENT.Y_AXIS,
        point: KEYS.COMPONENT.POINT,
      },
    },
  };
}
