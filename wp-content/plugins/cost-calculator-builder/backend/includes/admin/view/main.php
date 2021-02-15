<div class="ccb-main-calc" >
    <div class="ccb-wrapper showContent">
        <div>
            <div class="ccb-calc-main clear-both">
                <div class="ccb-calc-main ccb-bg-white clear-both m-t-30 p-r-15">
                    <div class="ccb-calc-panel-header clear-both">
                        <span class="title"><?php echo __("Cost Calculator", "cost-calculator-builder") ?></span>
                    </div>
                    <div id="ccb-calc-wrap">
                        <div class="ccb-page">
                            <div class="ccb-tab-wrapper ccb-effect-scale ccb-wrap-1">

                                <?php
                                require STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/tab-menu.php';
                                ?>
                                <ul>
                                    <li class="ccb-content ccb-tab-input-first ccb-list ccb-li-position-relative">
                                        <?php
                                        require STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/tab-pages/create-page.php';
                                        ?>
                                    </li>
                                    <li class="ccb-content ccb-tab-edit ccb-tab-edit-for-pos ccb-list">
                                        <div class="ccb-listing-header-wrapper">
                                            <h1><?php echo __("Existing Calculators", "cost-calculator-builder"); ?></h1>
                                            <?php
                                            $template = '<div class="export_and_import_wrapper">
                                                            <div class="ccb-export-import-wrapper">
                                                                <div class="listing-install-wrapper">
                                                                    <a class="ccb-circle-export" href="#ccb-demo-import" rel="modal:open" @click="getImportData">
                                                                        <i class="fas fa-download"></i>
                                                                    </a>
                                                                    <span class="ccb-install-button">
                                                                    ' . __("Import Calculators", "cost-calculator-builder") . '
                                                                    </span>
                                                                </div>
                                                                <div class="listing-install-wrapper">
                                                                    <a class="ccb-circle-download disabled">
                                                                        <i class="fas fa-upload"></i>
                                                                    </a>
                                                                    <a href="https://stylemixthemes.com/cost-calculator-plugin/" id="export_description">
                                                                        <span>'. __('This feature is part of', 'cost-calculator-builder') .'</span>
                                                                        <span>'. __('Premium Add-on', 'cost-calculator-builder') .'</span>
                                                                    </a>
                                                                </div>
                                                             </div>
                                                         </div>';

                                                    $template = apply_filters('ccb_export_&_import_calculators', $template);
                                                    echo $template;
                                            ?>
                                        </div>
                                        <?php
                                         require STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/tab-pages/listing-page.php';
                                        ?>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <?php
                    require STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/info.php';
                    require STM_CALCULATE_PATH . '/backend/includes/admin/view/partials/modal.php';
                    ?>
                </div>
            </div>
        </d>
    </div>
</div>