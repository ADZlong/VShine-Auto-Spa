$(document).ready(function () {
  const $promoModal = $("#promoModal");
  const $promoBtn = $("#promoBtn");
  const $promoBtn2 = $("#promoBtn2");
  const $promoClose = $("#promoClose");

  function openModal() {
    if ($promoModal.length) {
      $promoModal.fadeIn(200);
      $promoModal.attr("aria-hidden", "false");
    }
  }

  function closeModal() {
    if ($promoModal.length) {
      $promoModal.fadeOut(150);
      $promoModal.attr("aria-hidden", "true");
    }
  }

  $promoBtn.on("click", function () {
    openModal();
  });
  $promoBtn2.on("click", function () {
    openModal();
  });
  $promoClose.on("click", function () {
    closeModal();
  });

  $promoModal.on("click", function (e) {
    if ($(e.target).is("#promoModal")) {
      closeModal();
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  const $faqItems = $(".faq-item");
  $faqItems.each(function () {
    const $item = $(this);
    const $q = $item.find(".faq-q");
    const $a = $item.find(".faq-a");

    $q.on("click", function () {
      $faqItems.not($item).find(".faq-a").slideUp(180);
      if ($a.is(":visible")) {
        $a.slideUp(180);
      } else {
        $a.slideDown(200);
      }
    });
  });

  const $galleryItems = $(".gallery-item");
  if ($galleryItems.length) {
    $galleryItems.hide();
    $galleryItems.each(function (i) {
      $(this)
        .delay(i * 110)
        .fadeIn(350);
    });
  }
});
