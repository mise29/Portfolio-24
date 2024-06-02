$(function() {
    const $tabs = $('.tab');
    // エリパラメータを取得 'tab'=パラメータを整数として取得
    if ($tabs.length) {
        const queryParams = new URLSearchParams(location.search);
        const selectedTab = parseInt(queryParams.get('tab'), 10);
        
        // AllからLogoMarkの各タブのメニューとパネルを取得
        $tabs.each(function() {
            const $tabMenu = $(this).find('[role="tab"]');
            const $tabPanel = $(this).find('[role="tabpanel"]');
            
            // タブの初期表示　指定されたもの以外の時は最初のタブ（All）を表示
            if (Number.isInteger(selectedTab) && $tabMenu.eq(selectedTab).length) {
                switchTab($tabMenu.eq(selectedTab));
            } else if (!$tabMenu.is('[aria-expanded="true"]')) {
                switchTab($tabMenu.eq(0));
            }
            
            // クリックイベントと矢印キーでタブの切り替え可
            $tabMenu.on('click keydown', function(e) {
                if (e.type === 'click' || e.keyCode === 13) {
                    switchTab($(this));
                } else if (e.keyCode === 39) {
                    $(this).parent().next().children().focus().trigger('click');
                } else if (e.keyCode === 37) {
                    $(this).parent().prev().children().focus().trigger('click');
                }
            });
            
            // タブ切替処理 指定されたタブを表示し、他のタブを非表示にする
            function switchTab($tab) {
                if ($tab.attr('aria-expanded') === 'false') {
                    $tabMenu.attr('aria-expanded', 'false');
                    $tab.attr('aria-expanded', 'true');
                    $tabPanel.hide().eq($tab.parent().index()).attr('aria-expanded', 'true').fadeIn();
                    if (typeof set_image_size === 'function') set_image_size();
                }
            }
        });
    }
});
