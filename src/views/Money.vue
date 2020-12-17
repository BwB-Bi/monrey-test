<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type" />
    <div class="notes">
    <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component,Watch} from 'vue-property-decorator';
import {recordListModel} from '@/models/recordListModel';
import {tagListModel} from '@/models/tagListModel';

window.localStorage.setItem('version','0.0.1');

 const recordList = recordListModel.fetch();

 const tagList=tagListModel.fetch();

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; //类 /   构造函数
};
@Component({
  components: { Tags,  FormItem, Types, NumberPad},

})


export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[]=recordList;
  record: RecordItem={tags:[],notes:'',type:'-',amount:0};  //Record是record的类型
  onUpdateTags(value: string[]) {
    this.record.tags=value;
  }

  onUpdateNotes(value: string) {
    this.record.notes=value;
  }
  saveRecord(){
    const record2: RecordItem=JSON.parse(JSON.stringify(this.record));
    this.recordList.push(record2);
    record2.createdAt=new Date();
    console.log(this.recordList);
  }
@Watch('recordList')
    onRecordListChange(){
     recordListModel.save(this.recordList);
    }


}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding:12px 0;
}
</style>