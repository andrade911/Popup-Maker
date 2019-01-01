<?php
/*******************************************************************************
 * Copyright (c) 2018, WP Popup Maker
 ******************************************************************************/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/** Utility Functions */
require_once 'functions/utils/cache.php';
require_once 'functions/utils/options.php';
require_once 'functions/utils/template.php';
require_once 'functions/utils/upgrades.php';

/** General Functions */
require_once 'functions/developers.php';
require_once 'functions/general.php';
require_once 'functions/newsletter.php';

/** Admin Functions */
require_once 'functions/admin/conditionals.php';
require_once 'functions/admin/general.php';

/** Popup functions */
require_once 'functions/popups/conditionals.php';
require_once 'functions/popups/deprecated.php';
require_once 'functions/popups/getters.php';
require_once 'functions/popups/migrations.php';
require_once 'functions/popups/queries.php';
require_once 'functions/popups/template.php';

/** Popup Theme functions */
require_once 'functions/themes/conditionals.php';
require_once 'functions/themes/deprecated.php';
require_once 'functions/themes/getters.php';
require_once 'functions/themes/migrations.php';
require_once 'functions/themes/portability.php';
require_once 'functions/themes/queries.php';
require_once 'functions/themes/template.php';
