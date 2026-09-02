/**
 * Zakra starter-content "fresh site" notice.
 *
 * On a fresh site the starter Home page is staged in the Customizer and would be
 * created as soon as the user clicks "Publish". This notice lets the user choose:
 *
 *  - Keep the starter homepage : leave it staged ( Publish creates it ).
 *  - Start with a clean slate   : drop the staged page so Publish does NOT create it.
 *
 * @package zakra
 */
( function ( api, $ ) {
	'use strict';

	api.bind( 'ready', function () {

		var data = window.zakraStarterContent || {};

		var $card = $(
			'<div class="zakra-sc-notice">' +
				'<h3></h3>' +
				'<p></p>' +
				'<button type="button" class="button button-primary zakra-sc-keep"></button>' +
				'<button type="button" class="button zakra-sc-clean"></button>' +
				'<p class="zakra-sc-note"></p>' +
			'</div>'
		);

		// Use text() so localized strings are inserted safely.
		$card.find( 'h3' ).text( data.title || '' );
		$card.find( 'p' ).first().text( data.message || '' );
		$card.find( '.zakra-sc-keep' ).text( data.keep || '' );
		$card.find( '.zakra-sc-clean' ).text( data.clean || '' );
		$card.find( '.zakra-sc-note' ).text( data.note || '' );

		$( '#customize-theme-controls' ).prepend( $card );

		// Keep: simply dismiss. Starter content stays staged and publishes as usual.
		$card.on( 'click', '.zakra-sc-keep', function () {
			$card.slideUp( 150, function () {
				$card.remove();
			} );
		} );

		// Clean slate: drop the staged starter-content posts and front-page settings
		// so clicking "Publish" will not create the Home page.
		$card.on( 'click', '.zakra-sc-clean', function () {

			// Created posts ( includes the starter Home page ) — empty so none publish.
			var created = api( 'nav_menus_created_posts' );
			if ( created ) {
				created.set( [] );
			}

			// Reset the static-front-page settings back to a clean default.
			if ( api( 'show_on_front' ) ) {
				api( 'show_on_front' ).set( 'posts' );
			}
			if ( api( 'page_on_front' ) ) {
				api( 'page_on_front' ).set( 0 );
			}
			if ( api( 'page_for_posts' ) ) {
				api( 'page_for_posts' ).set( 0 );
			}

			// Refresh the preview so the staged design disappears.
			if ( api.previewer ) {
				api.previewer.refresh();
			}

			$card.slideUp( 150, function () {
				$card.remove();
			} );
		} );
	} );
} )( wp.customize, jQuery );
