Vue.component('cost-field', {
    props: ['field', 'id', 'order'],

    data: function () {
        return {
            type: '',
            alias: '',
            dataFields: '',
        }
    },

    created: function () {
        this.dataFields = JSON.stringify(this.field);
        this.type = this.field.type ? this.field.type.toLowerCase().replace(' ', '-') : '';
    },

    template: `  
                <div class="ccb-input-tool-filed-form list-group-item">
                    <div class="tools-field">
                        <i :class="field.icon"></i>
                        <span>{{field.type}}</span> {{field.alias ? '[' + field.alias +']' : '' }} {{field.label ? '- ' + field.label : ''}}
                         <span class="extra-link">
                            <i class="fal fa-pencil" v-on:click="$emit(\'click\', id)" title="Edit Field"></i>
                            <i class="fa fa-trash"v-on:click="$emit(\'remove\', id, order)" title="Remove Field"></i>
                        </span>
                    </div>
                </div>
            `,
});
