<section class="ccb-calc-listing">
    <div class="ccb-table-head">
        <table class="ccb-calc-listing-table" cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
                <th><?php echo __("ID", "cost-calculator-builder"); ?></th>
                <th><?php echo __("Project Name", "cost-calculator-builder"); ?></th>
                <th><?php echo __("Short Code", "cost-calculator-builder"); ?></th>
                <th><?php echo __("Actions", "cost-calculator-builder"); ?></th>
            </tr>
            </thead>
        </table>
    </div>
    <div class="ccb-table-body" v-if="listings && listings.length">
        <table class="ccb-calc-listing-table" cellpadding="0" cellspacing="0" border="0">
            <tbody>
            <tr v-for="(item, index) in listings" v-bind:key="index">
                <td>{{item.id}}</td>
                <td> {{item.project_name}}</td>
                <td>
                    <span class="ccb-tooltip">
                        <span class="ccb-item-short" @mouseleave="textCopy = 'Copy shortcode'"  @click.prevent="copyText(item.id)">[stm-calc id="{{item.id}}"]</span>
                        <span class="ccb-tooltip-text">{{textCopy}}</span>
                        <input type="hidden" class="calc-short-code" :data-id="item.id" :value='`[stm-calc id="` + item.id +`"]`'>
                    </span>
                </td>
                <td>
                    <a class="ccb-listing-buttons ccb-green"
                       :href="location_url + '/wp-admin/admin.php?page=cost_calculator_builder&action=edit&id=' + item.id">
                        <div class="circle">
                            <span class="ccb-icon ccb-arrow"></span>
                        </div>
                        <p class="button-text"><?php echo __("Edit", "cost-calculator-builder"); ?></p>
                    </a>
                    <a class="ccb-listing-buttons ccb-red" @click.prevent="removeFromListing(item.id, index)" href="#listing-delete-modal" rel="modal:open">
                        <div class="circle">
                            <span class="ccb-icon ccb-arrow"></span>
                        </div>
                        <p class="button-text"><?php echo __("Delete", "cost-calculator-builder"); ?></p>
                    </a>
                    <a class="ccb-listing-buttons ccb-blue" :href="location_url + '/wp-admin/admin.php?page=cost_calculator_custom&action=customize&id=' + item.id">
                        <div class="circle">
                            <span class="ccb-icon ccb-arrow"></span>
                        </div>
                        <p class="button-text"><?php echo __("Customize", "cost-calculator-builder"); ?></p>
                    </a>
                    <a class="ccb-listing-buttons ccb-blue" @click.prevent="duplicateListing(item.id, index)">
                        <div class="circle">
                            <span class="ccb-icon ccb-arrow"></span>
                        </div>
                        <p class="button-text"><?php echo __("Duplicate", "cost-calculator-builder"); ?></p>
                    </a>
                </td>
            </tr>

            </tbody>
        </table>
    </div>
    <div v-if="!listings.length">
        <p class="ccb-no-posts"><?php echo __('There are no calculators yet', 'cost-calculator-builder') ?></p>
    </div>
</section>