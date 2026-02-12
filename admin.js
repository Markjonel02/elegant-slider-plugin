
jQuery(document).ready(function($) {
    const $slidesContainer = $('#esp-sortable-slides');
    
    // Initialize Drag & Drop
    if ($slidesContainer.length) {
        $slidesContainer.sortable({
            handle: '.drag-handle',
            placeholder: 'esp-card-placeholder'
        });
    }

    // Tab Navigation
    $('.view-toggles .esp-toggle-btn').on('click', function() {
        const view = $(this).data('view');
        $('.view-toggles .esp-toggle-btn').removeClass('active');
        $(this).addClass('active');
        
        $('.esp-content-view').removeClass('active');
        $('#esp-view-' + view).addClass('active');
    });

    // Device Frame Toggles
    $('.device-toggles .esp-toggle-btn').on('click', function() {
        const device = $(this).data('device');
        $('.device-toggles .esp-toggle-btn').removeClass('active');
        $(this).addClass('active');
        
        $('#esp-device-frame').removeClass('desktop mobile').addClass(device);
    });

    // Sidebar Choice Buttons
    $('.esp-choice-btn').on('click', function() {
        const val = $(this).data('val');
        const $input = $(this).siblings('input[type="hidden"]');
        
        $(this).parent().find('.esp-choice-btn').removeClass('active');
        $(this).addClass('active');
        $input.val(val);
    });

    // Copy Feedback
    $('.esp-copy-btn-v3').on('click', function() {
        const code = $(this).data('code');
        const $btn = $(this);
        const originalHtml = $btn.html();

        navigator.clipboard.writeText(code).then(() => {
            $btn.addClass('success').html('<i class="fas fa-check"></i> Copied!');
            setTimeout(() => {
                $btn.removeClass('success').html(originalHtml);
            }, 2000);
        });
    });

    // Add New Slide
    $('#esp-add-slide-v3').on('click', function() {
        const index = $slidesContainer.children().length;
        const template = `
            <div class="esp-card-slide" data-index="${index}">
                <div class="card-media">
                    <img src="https://via.placeholder.com/1200x600?text=Upload+Image" class="main-preview">
                    <button type="button" class="delete-btn esp-delete-slide"><i class="fas fa-trash"></i></button>
                </div>
                <div class="card-content">
                    <div class="card-top">
                        <div class="status-toggle">
                            <label class="esp-switch-v3 mini">
                                <input type="checkbox" name="esp_slides[${index}][active]" value="1" checked>
                                <span class="slider"></span>
                            </label>
                            <span class="status-text">Published</span>
                        </div>
                        <div class="drag-handle handle"><i class="fas fa-grip-vertical"></i></div>
                    </div>
                    <div class="card-fields">
                        <div class="input-group">
                            <label>Desktop URL</label>
                            <div class="url-wrap">
                                <input type="text" name="esp_slides[${index}][desktop_url]" value="" placeholder="https://...">
                                <button type="button" class="esp-media-trigger"><i class="fas fa-upload"></i></button>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Mobile URL (Optional)</label>
                            <div class="url-wrap">
                                <input type="text" name="esp_slides[${index}][mobile_url]" value="" placeholder="https://...">
                                <button type="button" class="esp-media-trigger"><i class="fas fa-upload"></i></button>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Redirect Link</label>
                            <div class="url-wrap">
                                <i class="fas fa-link inner-icon"></i>
                                <input type="text" name="esp_slides[${index}][link]" value="" placeholder="https://..." class="has-icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $slidesContainer.append(template);
    });

    // Delete Slide with Confirmation
    $slidesContainer.on('click', '.esp-delete-slide', function() {
        if(confirm('Are you sure you want to remove this slide?')) {
            $(this).closest('.esp-card-slide').fadeOut(300, function() {
                $(this).remove();
            });
        }
    });

    // Image Picker
    $slidesContainer.on('click', '.esp-media-trigger', function() {
        const $input = $(this).siblings('input');
        const $card = $(this).closest('.esp-card-slide');
        const $preview = $card.find('.main-preview');
        
        const frame = wp.media({
            title: 'Select Slide Image',
            multiple: false
        }).on('select', function() {
            const attachment = frame.state().get('selection').first().toJSON();
            $input.val(attachment.url);
            if ($input.attr('name').includes('desktop_url')) {
                $preview.attr('src', attachment.url);
            }
        }).open();
    });

    // Status toggle label text
    $slidesContainer.on('change', '.esp-switch-v3 input', function() {
        const $label = $(this).closest('.status-toggle').find('.status-text');
        $label.text($(this).is(':checked') ? 'Published' : 'Hidden');
    });
});
