$(function() {

  // Custom cursor
  $(document).on('mousemove', function(e) {
    $('#cursor').css({ left: e.clientX, top: e.clientY });
    setTimeout(() => $('#cursor-ring').css({ left: e.clientX, top: e.clientY }), 60);
  });

  // Nav scroll
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 60) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        // Animate counters
        if ($(entry.target).find('.count').length) {
          $(entry.target).find('.count').each(function() {
            const $el = $(this);
            const target = parseInt($el.data('target'));
            let current = 0;
            const step = target / 50;
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              $el.text(Math.floor(current));
              if (current >= target) clearInterval(timer);
            }, 25);
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $('.reveal').each(function() { observer.observe(this); });

  // Project filter
  $('.filter-btn').on('click', function() {
    const filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.project-card').fadeIn(300);
    } else {
      $('.project-card').each(function() {
        if ($(this).data('category') === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });

  // Smooth scroll for nav links
  $('a[href^="#"]').on('click', function(e) {
    const target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700, 'swing');
    }
  });

  // Active nav link on scroll
  $(window).on('scroll', function() {
    const scrollPos = $(this).scrollTop() + 120;
    $('section[id]').each(function() {
      if (scrollPos >= $(this).offset().top && scrollPos < $(this).offset().top + $(this).outerHeight()) {
        $('.nav-links a').removeClass('active');
        $(`.nav-links a[href="#${$(this).attr('id')}"]`).addClass('active');
      }
    });
  });

});
