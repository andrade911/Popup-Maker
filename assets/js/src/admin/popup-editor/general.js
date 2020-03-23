/*******************************************************************************
 * Copyright (c) 2019, Code Atlantic LLC
 ******************************************************************************/
(function ($) {
    "use strict";

    window.PUM_Admin = window.PUM_Admin || {};

    window.pum_popup_settings_editor = window.pum_popup_settings_editor || {
        form_args: {},
        current_values: {}
    };

    $(document)
        .ready(function () {
            $(this).trigger('pum_init');

            $('#title').prop('required', true);

            var $container = $('#pum-popup-settings-container'),
                args = pum_popup_settings_editor.form_args || {},
                values = pum_popup_settings_editor.current_values || {};

            if ($container.length) {
                $container.find('.pum-no-js').hide();
                PUM_Admin.forms.render(args, values, $container);
            }

            $('a.page-title-action')
                .clone()
                .attr('target', '_blank')
                .attr('href', pum_admin_vars.homeurl + '?popup_preview=true&popup=' + $('#post_ID').val())
                .text(pum_admin_vars.I10n.preview_popup)
                .insertAfter('a.page-title-action');

            // TODO Can't figure out why this is needed, but it looks stupid otherwise when the first condition field defaults to something other than the placeholder.
            $('#pum-first-condition, #pum-first-trigger, #pum-first-cookie')
                .val(null)
                .trigger('change');

            // Add event handler to detect when opening sound is change and play the sound to allow admin to preview it.
			document.querySelector( '#pum-popup-settings-container' ).addEventListener( 'change', function(e) {
				if ( 'open_sound' === e.target.id ) {
					// Only play if the sound selected is not None or Custom.
					if ( ! ['none', 'custom'].includes( e.target.value ) ) {
						const audio = new Audio( pum_admin_vars.pm_dir_url + '/assets/sounds/' + e.target.value );
						audio.addEventListener( 'canplaythrough', function() {
							this.play()
								.catch(function( reason ) {
									console.warn(`Sound was not able to play when selected. Reason: ${reason}.`);
								});
						});
						audio.addEventListener( 'error', function() {
							console.warn( 'Error occurred when trying to load popup opening sound.' );
						});
					}
				}
			});

			document.querySelector( '#pum-popup-settings-container' ).addEventListener( 'click', function(e) {
				if ( Array.from(e.target.classList).includes('popup-type') || Array.from(e.target.parentElement.classList).includes('popup-type') ) {
					const $container = jQuery( '#pum-popup-settings-container' );
					if ( 1 === $container.length ) {
						// Temporarily hardcoded object for testing...
						const popupTypes = {
							'center-popup': {
								'size': 'medium',
								'responsive_min_width': '0%',
								'responsive_max_width': '100%',
								'animation_type': 'fade',
								'animation_speed': 350,
								'location': 'center',
								'overlay_disabled': false,
								'stackable': false,
								'disable_reposition': false,
							},
							'left-bottom-notice': {
								'size': 'tiny',
								'responsive_min_width': '0%',
								'responsive_max_width': '100%',
								'animation_type': 'slide',
								'animation_speed': 500,
								'animation_origin': 'left bottom',
								'location': 'left bottom',
								'position_bottom': 10,
								'position_left': 10,
								'position_fixed': true,
								'overlay_disabled': true,
								'stackable': false,
								'disable_reposition': false,
							},
							'top-bar': {
								'size': 'custom',
								'custom_width': '100%',
								'custom_height_auto': true,
								'animation_type': 'fadeAndSlide',
								'animation_speed': 300,
								'animation_origin': 'center top',
								'location': 'center top',
								'position_top': 0,
								'position_fixed': true,
								'overlay_disabled': true,
								'stackable': false,
								'disable_reposition': false,
							}
						};
						const popupType = e.target.dataset.popupType || e.target.parentElement.dataset.popupType || '';
						const presetValues = popupTypes.hasOwnProperty(popupType) ? popupTypes[ popupType ] : {};
						const args = pum_popup_settings_editor.form_args || {};
						const originalValues = pum_popup_settings_editor.current_values || {};
						const currentValues = $container.pumSerializeObject();
						const newValues = Object.assign( {}, originalValues, currentValues.popup_settings, presetValues );
						PUM_Admin.forms.render(args, newValues, $container);
					}
				}
			});
        })
        .on('keydown', '#popup-title', function (event) {
            var keyCode = event.keyCode || event.which;
            if (9 === keyCode) {
                event.preventDefault();
                $('#title').focus();
            }
        })
        .on('keydown', '#title, #popup-title', function (event) {
            var keyCode = event.keyCode || event.which,
                target;
            if (!event.shiftKey && 9 === keyCode) {
                event.preventDefault();
                target = $(this).attr('id') === 'title' ? '#popup-title' : '#insert-media-button';
                $(target).focus();
            }
        })
        .on('keydown', '#popup-title, #insert-media-button', function (event) {
            var keyCode = event.keyCode || event.which,
                target;
            if (event.shiftKey && 9 === keyCode) {
                event.preventDefault();
                target = $(this).attr('id') === 'popup-title' ? '#title' : '#popup-title';
                $(target).focus();
            }
        });
}(jQuery));
