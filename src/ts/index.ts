document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('[data-shop-by-sport]');
  if (!section) return;

  const scrollContainer = section.querySelector('[data-scroll-container]') as HTMLElement;
  const prevBtn = section.querySelector('[data-prev]') as HTMLElement;
  const nextBtn = section.querySelector('[data-next]') as HTMLElement;
  const firstCard = section.querySelector('[data-card]') as HTMLElement;

  if (!scrollContainer || !prevBtn || !nextBtn || !firstCard) return;

  // 버튼 클릭 시 한 번에 얼마나 이동할지 슬라이딩되는 양을 지정함
  function getScrollAmount() {
    // 화면에 보이는 영역만큼 슬라이딩
    return scrollContainer.clientWidth as number;
  }

  // 이전 버튼 클릭 시
  prevBtn.addEventListener('click', function () {
    scrollContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth',
    });
  });

  // 다음 버튼 클릭 시
  nextBtn.addEventListener('click', function () {
    scrollContainer.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth',
    });
  });

  const carousel = document.querySelector('[data-carousel]') as HTMLElement;
    if (!carousel) return;

    const track = carousel.querySelector('[data-carousel-track]') as HTMLElement;
    const firstSquareCard = carousel.querySelector('[data-carousel-card]') as HTMLElement;
    const prevSquareBtn = carousel.querySelector('[data-carousel-prev]') as HTMLElement;
    const nextSquareBtn = carousel.querySelector('[data-carousel-next]') as HTMLElement;

    if (!track || !firstSquareCard || !prevSquareBtn || !nextSquareBtn) return;

    // 한 번 클릭할 때 이동할 거리 (카드 3장 정도)
    function getSquareScrollAmount() {
      const cardWidth = firstSquareCard.getBoundingClientRect().width;
      return cardWidth * 1; // 필요하면 2나 4로 조정
    }

    prevSquareBtn.addEventListener('click', function () {
      track.scrollBy({
        left: -getSquareScrollAmount(),
        behavior: 'smooth',
      });
    });

    nextSquareBtn.addEventListener('click', function () {
      track.scrollBy({
        left: getSquareScrollAmount(),
        behavior: 'smooth',
      });
    });
});