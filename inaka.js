$(function ()
  {
      $(window).on('load resize',
                   function ()
                   {
                       $('section').css('height', $(window).height());
                       $('section > big').each(function ()
                                     {
                                         $(this).css('margin-top', -parseInt($(this).css('height')) / 2);
                                         $(this).css('margin-left', -parseInt($(this).css('width')) / 2 - parseInt($(this).parent().css('padding-left')));
                                     });
                       update();
                   });

      var current = 0;
      var pages = $('section').length;
      var focus = false;

      if (location.hash && !isNaN(parseInt(location.hash.substr(1)))) {
          var c = parseInt(location.hash.substr(1));
          if (0 <= c && c < pages) {
              current = c;
          }
      }

      $('section').css('height', $(window).height()).css('opacity', 1);
      update();

      function next()
      {
          if (current < pages - 1) {
              current++;
          }
          update();
      }

      function back()
      {
          if (current > 0) {
              current--;
          }
          update();
      }

      function update()
      {
          if ('pushState' in history) {
              history.pushState(null, null, location.pathname + '#' + current);
          }
          window.scrollTo(0, $(window).height() * current);
          focus = $('section').eq(current).hasClass('fullscreen-video');
      }

      var lock = false;
      $('*').on('keydown',
                function (e)
                {
                    if (lock) return;
                    lock = true;
                    switch (e.keyCode)
                    {
                    case 36:
                        current = 0;
                        update();
                        break;
                    case 35:
                        current = pages - 1;
                        update();
                        break;
                    case 74:
                    case 39:
                    case 40:
                    case 32:
                    case 13:
                        next();
                        break;
                    case 75:
                    case 37:
                    case 38:
                        back();
                        break;
                    }
                    setTimeout(function () { lock = false; }, 50);
                });

      $('section').on('click',
                      function ()
                      {
                          $('body').css('cursor', $('body').css('cursor') == 'none' ? 'default' : 'none');
                      });

      setInterval(function ()
                  {
                      if (focus) {
                          $('section').eq(current).find('iframe').blur();
                          $('body').focus();
                      }
                  }, 2000);
  });
