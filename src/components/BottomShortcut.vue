<template>
    <el-container @click.stop.prevent="onClickButton" class="maxH">
        <el-aside style="padding: 0;" width="120px">
            <div class="maxH enve">
                <el-button-group>
                    <el-button class="button" text bg :size="buttonSize">fx</el-button>
                    <el-button class="button" text bg :size="buttonSize">选择</el-button>
                    <el-button class="button" text bg :size="buttonSize" :icon="ArrowUpBold"></el-button>
                    <el-button class="button" text bg :size="buttonSize">复制</el-button>
                    <el-button class="button" text bg :size="buttonSize" :icon="Management" @click.stop></el-button>
                    <el-button class="button" text bg :size="buttonSize" :icon="ArrowLeftBold"></el-button>
                    <el-button class="button" text bg :size="buttonSize" :icon="ArrowDownBold"></el-button>
                    <el-button class="button" text bg :size="buttonSize" :icon="ArrowRightBold"></el-button>
                </el-button-group>
            </div>
        </el-aside>
        <el-main style="padding: 0;">
            <el-scrollbar>
                <el-button-group>
                    <el-button class="button" v-for="(item, index) in symbols" @click="insertText(item.insertText)"
                        :key="index" text bg :size="buttonSize">
                        {{ item.hint }}</el-button>
                </el-button-group>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeftBold, ArrowUpBold, ArrowRightBold, ArrowDownBold, Management } from '@element-plus/icons-vue'
import { symbols } from '../core/user_symbols'
import { insertText, getDefaultEditor } from '../core/app'

const buttonSize = ref<'small' | 'default' | 'large'>("default")
function onClickButton(): void {
    getDefaultEditor()?.editor.focus();
}

</script>
<style scoped>
.box {
    display: flex;
    flex-wrap: nowrap;
}

.button {
    width: 30px;
    height: 30px;
    overflow: hidden;
}

.enve {
    width: 100%;
}


.maxH {
    height: 100%;
    overflow: hidden;
}
</style>