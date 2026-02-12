<?php

/**
 * Plugin Name: Elegant Slider Pro
 * Plugin URI: https://github.com/Markjonel02/elegant-slider-plugin.git
 * Description: A premium, colorful WordPress slider with mobile image support, grid layouts, and advanced animations.
 * Version: 2.3.0
 * Author: Mark Relles 
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) exit;

class Elegant_Slider_Pro
{
    public function __construct()
    {
        add_action('init', [$this, 'register_post_type']);
        add_action('add_meta_boxes', [$this, 'add_meta_boxes']);
        add_action('save_post', [$this, 'save_slider_data']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_shortcode('elegant_slider', [$this, 'render_slider']);

        add_filter('manage_esp_slider_posts_columns', [$this, 'add_shortcode_column']);
        add_action('manage_esp_slider_posts_custom_column', [$this, 'display_shortcode_column'], 10, 2);
    }

    public function register_post_type()
    {
        register_post_type('esp_slider', [
            'labels' => [
                'name' => 'Elegant Sliders',
                'singular_name' => 'Slider',
                'add_new' => 'Create New Slider',
                'edit_item' => 'Configure Slider'
            ],
            'public' => false,
            'show_ui' => true,
            'menu_icon' => 'dashicons-images-alt2',
            'supports' => ['title'],
        ]);
    }

    public function add_meta_boxes()
    {
        remove_meta_box('submitdiv', 'esp_slider', 'side');
        add_meta_box('esp_dashboard', 'Elegant Slider Pro Dashboard', [$this, 'render_dashboard'], 'esp_slider', 'normal', 'high');
    }

    public function render_dashboard($post)
    {
        wp_nonce_field('esp_save', 'esp_nonce');
        $slides = get_post_meta($post->ID, '_esp_slides', true) ?: [];
        $settings = get_post_meta($post->ID, '_esp_settings', true) ?: [];
        $defaults = [
            'layout' => 'flex',
            'animation' => 'slide',
            'radius' => 16,
            'gap' => 10,
            'columns' => 1,
            'accent_color' => '#6366f1',
            'autoplay' => '1',
            'arrows' => '1',
            'dots' => '1',
            'autoplay_speed' => 5000
        ];
        $settings = wp_parse_args($settings, $defaults);
        $shortcode = '[elegant_slider id="' . $post->ID . '"]';
?>
        <div id="esp-dashboard-app" class="esp-dashboard-v3">
            <header class="esp-dash-header">
                <div class="esp-header-left">
                    <div class="esp-logo-icon"><i class="fas fa-layer-group"></i></div>
                    <div class="esp-brand">
                        <span class="esp-title">Elegant Slider Pro</span>
                        <span class="esp-subtitle">DASHBOARD V2.3</span>
                    </div>
                </div>

                <div class="esp-header-center">
                    <div class="esp-toggle-group device-toggles">
                        <button type="button" class="esp-toggle-btn active" data-device="desktop"><i class="fas fa-desktop"></i> Desktop</button>
                        <button type="button" class="esp-toggle-btn" data-device="mobile"><i class="fas fa-mobile-alt"></i> Mobile</button>
                    </div>
                    <div class="esp-divider"></div>
                    <div class="esp-toggle-group view-toggles">
                        <button type="button" class="esp-toggle-btn active" data-view="manage"><i class="fas fa-images"></i> Manage Slides</button>
                        <button type="button" class="esp-toggle-btn" data-view="preview"><i class="fas fa-eye"></i> Live Preview</button>
                    </div>
                </div>

                <div class="esp-header-right">
                    <button type="submit" name="save" id="publish" class="esp-btn-primary shadow-indigo">
                        <i class="fas fa-plus"></i> Save Changes
                    </button>
                </div>
            </header>

            <div class="esp-dash-body">
                <aside class="esp-dash-sidebar">
                    <div class="sidebar-top-label">GLOBAL SETTINGS</div>

                    <div class="esp-sidebar-section">
                        <div class="section-header">
                            <i class="fas fa-th-large text-indigo"></i>
                            <h3>Layout & Structure</h3>
                        </div>

                        <div class="esp-field-group">
                            <label>Container Type</label>
                            <div class="esp-btn-grid">
                                <button type="button" class="esp-choice-btn <?php echo $settings['layout'] === 'flex' ? 'active' : ''; ?>" data-val="flex">Slider (Flex)</button>
                                <button type="button" class="esp-choice-btn <?php echo $settings['layout'] === 'grid' ? 'active' : ''; ?>" data-val="grid">Grid View</button>
                                <input type="hidden" name="esp_settings[layout]" value="<?php echo esc_attr($settings['layout']); ?>">
                            </div>
                        </div>

                        <div class="esp-field-group">
                            <label>Border Radius (<?php echo $settings['radius']; ?>px)</label>
                            <input type="range" name="esp_settings[radius]" min="0" max="100" value="<?php echo esc_attr($settings['radius']); ?>" class="esp-range-indigo">
                        </div>
                    </div>

                    <div class="esp-sidebar-section">
                        <div class="section-header">
                            <i class="fas fa-magic text-rose"></i>
                            <h3>Animations</h3>
                        </div>

                        <div class="esp-field-group">
                            <label>Transition Effect</label>
                            <select name="esp_settings[animation]" class="esp-styled-select">
                                <option value="slide" <?php selected($settings['animation'], 'slide'); ?>>Slide Right/Left</option>
                                <option value="fade" <?php selected($settings['animation'], 'fade'); ?>>Smooth Fade</option>
                                <option value="zoom" <?php selected($settings['animation'], 'zoom'); ?>>Zoom Scale</option>
                            </select>
                        </div>

                        <div class="esp-switch-row">
                            <label>Autoplay</label>
                            <label class="esp-switch-v3">
                                <input type="checkbox" name="esp_settings[autoplay]" value="1" <?php checked($settings['autoplay'], '1'); ?>>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="esp-sidebar-section">
                        <div class="section-header">
                            <i class="fas fa-location-arrow text-amber"></i>
                            <h3>Navigation</h3>
                        </div>
                        <div class="esp-switch-row">
                            <label>Show Arrows</label>
                            <label class="esp-switch-v3">
                                <input type="checkbox" name="esp_settings[arrows]" value="1" <?php checked($settings['arrows'], '1'); ?>>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="esp-switch-row">
                            <label>Show Pagination Dots</label>
                            <label class="esp-switch-v3">
                                <input type="checkbox" name="esp_settings[dots]" value="1" <?php checked($settings['dots'], '1'); ?>>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="esp-sidebar-footer">
                        <div class="footer-label">YOUR SHORTCODE</div>
                        <div class="esp-shortcode-box-v3">
                            <code><?php echo esc_html($shortcode); ?></code>
                            <button type="button" class="esp-copy-btn-v3" data-code="<?php echo esc_attr($shortcode); ?>">
                                <i class="fas fa-copy"></i> Copy Shortcode
                            </button>
                        </div>
                    </div>
                </aside>

                <main class="esp-dash-main">
                    <div id="esp-view-manage" class="esp-content-view active">
                        <div class="view-header-row">
                            <h2>Your Slides <span class="badge"><?php echo count($slides); ?></span></h2>
                            <button type="button" id="esp-add-slide-v3" class="esp-btn-outline-v3"><i class="fas fa-plus"></i> Add New Slide</button>
                        </div>

                        <div id="esp-sortable-slides" class="esp-slides-grid-v3">
                            <?php foreach ($slides as $index => $slide): ?>
                                <div class="esp-card-slide" data-index="<?php echo $index; ?>">
                                    <div class="card-media">
                                        <img src="<?php echo esc_url($slide['desktop_url'] ?: 'https://via.placeholder.com/1200x600?text=No+Image'); ?>" class="main-preview">
                                        <button type="button" class="delete-btn esp-delete-slide"><i class="fas fa-trash"></i></button>
                                    </div>
                                    <div class="card-content">
                                        <div class="card-top">
                                            <div class="status-toggle">
                                                <label class="esp-switch-v3 mini">
                                                    <input type="checkbox" name="esp_slides[<?php echo $index; ?>][active]" value="1" <?php checked($slide['active'] ?? '1', '1'); ?>>
                                                    <span class="slider"></span>
                                                </label>
                                                <span class="status-text"><?php echo ($slide['active'] ?? '1') === '1' ? 'Published' : 'Hidden'; ?></span>
                                            </div>
                                            <div class="drag-handle handle"><i class="fas fa-grip-vertical"></i></div>
                                        </div>

                                        <div class="card-fields">
                                            <div class="input-group">
                                                <label>Desktop URL</label>
                                                <div class="url-wrap">
                                                    <input type="text" name="esp_slides[<?php echo $index; ?>][desktop_url]" value="<?php echo esc_attr($slide['desktop_url']); ?>" placeholder="https://...">
                                                    <button type="button" class="esp-media-trigger"><i class="fas fa-upload"></i></button>
                                                </div>
                                            </div>
                                            <div class="input-group">
                                                <label>Mobile URL (Optional)</label>
                                                <div class="url-wrap">
                                                    <input type="text" name="esp_slides[<?php echo $index; ?>][mobile_url]" value="<?php echo esc_attr($slide['mobile_url']); ?>" placeholder="https://...">
                                                    <button type="button" class="esp-media-trigger"><i class="fas fa-upload"></i></button>
                                                </div>
                                            </div>
                                            <div class="input-group">
                                                <label>Redirect Link</label>
                                                <div class="url-wrap">
                                                    <i class="fas fa-link inner-icon"></i>
                                                    <input type="text" name="esp_slides[<?php echo $index; ?>][link]" value="<?php echo esc_attr($slide['link']); ?>" placeholder="https://..." class="has-icon">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div id="esp-view-preview" class="esp-content-view">
                        <div class="preview-stage">
                            <div id="esp-device-frame" class="device-frame desktop">
                                <div class="frame-content">
                                    <!-- Preview content injected by JS -->
                                    <div class="preview-loading">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <p>Refreshing Preview...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    <?php
    }

    public function add_shortcode_column($columns)
    {
        $new_columns = [];
        foreach ($columns as $key => $value) {
            if ($key === 'date') $new_columns['shortcode'] = 'Shortcode';
            $new_columns[$key] = $value;
        }
        return $new_columns;
    }

    public function display_shortcode_column($column, $post_id)
    {
        if ($column === 'shortcode') {
            echo '<code style="background: #eef2ff; color: #4f46e5; padding: 4px 8px; border-radius: 4px; border: 1px solid #c7d2fe;">[elegant_slider id="' . $post_id . '"]</code>';
        }
    }

    public function save_slider_data($post_id)
    {
        if (!isset($_POST['esp_nonce']) || !wp_verify_nonce($_POST['esp_nonce'], 'esp_save')) return;
        if (isset($_POST['esp_settings'])) {
            $settings = $_POST['esp_settings'];
            $settings['autoplay'] = isset($settings['autoplay']) ? '1' : '0';
            $settings['arrows']   = isset($settings['arrows']) ? '1' : '0';
            $settings['dots']     = isset($settings['dots']) ? '1' : '0';
            update_post_meta($post_id, '_esp_settings', $settings);
        }
        if (isset($_POST['esp_slides'])) {
            $slides = $_POST['esp_slides'];
            foreach ($slides as $i => $slide) {
                $slides[$i]['active'] = isset($slide['active']) ? '1' : '0';
            }
            update_post_meta($post_id, '_esp_slides', $slides);
        }
    }

    public function enqueue_admin_assets($hook)
    {
        if (!in_array($hook, ['post.php', 'post-new.php'])) return;
        wp_enqueue_media();
        wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        wp_enqueue_style('esp-admin-style', plugin_dir_url(__FILE__) . 'admin.css', [], '2.3.0');
        wp_enqueue_script('esp-admin-script', plugin_dir_url(__FILE__) . 'admin.js', ['jquery', 'jquery-ui-sortable'], '2.3.0', true);
    }

    public function enqueue_frontend_assets()
    {
        wp_enqueue_style('esp-frontend-style', plugin_dir_url(__FILE__) . 'frontend.css');
        wp_enqueue_script('esp-frontend-script', plugin_dir_url(__FILE__) . 'frontend.js', [], null, true);
    }

    public function render_slider($atts)
    {
        $id = $atts['id'] ?? 0;
        if (!$id) return '';
        $slides = get_post_meta($id, '_esp_slides', true) ?: [];
        $settings = get_post_meta($id, '_esp_settings', true) ?: [];
        if (empty($slides)) return '';

        ob_start();
    ?>
        <div class="esp-slider-root"
            style="--esp-accent: <?php echo $settings['accent_color'] ?? '#6366f1'; ?>; --esp-radius: <?php echo $settings['radius'] ?? '12'; ?>px;"
            data-layout="<?php echo $settings['layout'] ?? 'flex'; ?>"
            data-animation="<?php echo $settings['animation'] ?? 'slide'; ?>"
            data-autoplay="<?php echo ($settings['autoplay'] ?? '1') === '1' ? 'true' : 'false'; ?>">

            <div class="esp-slider-wrapper">
                <?php foreach ($slides as $index => $slide): if (!($slide['active'] ?? true)) continue; ?>
                    <div class="esp-slide <?php echo $index === 0 ? 'active' : ''; ?>">
                        <?php if (!empty($slide['link'])): ?><a href="<?php echo esc_url($slide['link']); ?>" class="esp-link"><?php endif; ?>
                            <picture>
                                <source media="(max-width: 768px)" srcset="<?php echo esc_url($slide['mobile_url'] ?: $slide['desktop_url']); ?>">
                                <img src="<?php echo esc_url($slide['desktop_url']); ?>" alt="Slide Image">
                            </picture>
                            <?php if (!empty($slide['link'])): ?>
                            </a><?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>

            <?php if (($settings['layout'] ?? 'flex') === 'flex'): ?>
                <?php if (($settings['arrows'] ?? '1') === '1'): ?>
                    <button class="esp-nav-btn prev">❮</button>
                    <button class="esp-nav-btn next">❯</button>
                <?php endif; ?>
                <?php if (($settings['dots'] ?? '1') === '1'): ?>
                    <div class="esp-dots-container"></div>
                <?php endif; ?>
            <?php endif; ?>
        </div>
<?php
        return ob_get_clean();
    }
}
new Elegant_Slider_Pro();
