interface Easing {
  (
    durationRatio: number,
    ellapsedTime: number,
    start: number,
    end: number,
    durationInMiliseconds: number
  ): number;
}
interface AnimationConfig {
  duration: number;
  easing: Easing;
}
const ANIMATION_CONFIG: AnimationConfig = {
  duration: 1000,
  easing(x, t, b, c, d) {
    // jquery animation: swing (easeOutQuad)
    return -c * (t /= d) * (t - 2) + b;
  },
};
export function animateMarker(
  marker: google.maps.Marker,
  newPosition: { lat: number; lng: number },
  animationConfig: AnimationConfig = ANIMATION_CONFIG
) {
  const atStartPosition_lat = marker.getPosition()?.lat();
  const atStartPosition_lng = marker.getPosition()?.lng();
  if (!(atStartPosition_lat && atStartPosition_lng)) return;
  const { lat, lng } = newPosition;

  const animateStep = function (marker: google.maps.Marker, startTime: number) {
    const ellapsedTime: number = Date.now() - startTime;
    const durationRatio = ellapsedTime / animationConfig.duration; // 0 - 1
    const easingDurationRatio = animationConfig.easing(
      durationRatio,
      ellapsedTime,
      0,
      1,
      animationConfig.duration
    );

    if (durationRatio < 1) {
      marker.setPosition({
        lat:
          atStartPosition_lat +
          (lat - atStartPosition_lat) * easingDurationRatio,
        lng:
          atStartPosition_lng +
          (lng - atStartPosition_lng) * easingDurationRatio,
      });
      const AnimationHandler = setTimeout(function () {
        animateStep(marker, startTime);
      }, 17);
    } else {
      marker.setPosition(newPosition);
    }
  };

  animateStep(marker, Date.now());
}
