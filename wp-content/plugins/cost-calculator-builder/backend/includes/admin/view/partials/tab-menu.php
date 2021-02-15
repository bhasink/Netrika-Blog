<input type="radio" name="ccb-calc-radio" checked id="ccb-create-calc" class="ccb-input ccb-tab-input-first">
<label for="ccb-create-calc" class="ccb-tab-label ccb-label" v-on:click="changePosition">
    <i class="fas fa-plus-circle" v-on:click="changePosition"></i><?php echo __("Calculator", "cost-calculator-builder"); ?>
</label>

<input type="radio" name="ccb-calc-radio" id="ccb-calc-list" class="ccb-tab-edit ccb-tab-edit-for-pos">
<label for="ccb-calc-list" class="ccb-tab-label" v-on:click="changePosition">
    <i class="fas fa-list-alt" v-on:click="changePosition"></i><?php echo __("Existing", "cost-calculator-builder"); ?>
</label>