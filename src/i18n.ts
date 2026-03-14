import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      "app": {
        "title": "🧰 旅遊瑞士刀",
        "subtitle": "您的全能旅遊助手",
        "footer": "Made for Travelers 🌍"
      },
      "groups": {
        "default": "預設",
        "add": "新增",
        "edit": "編輯群組",
        "settings": "工具設定",
        "new_placeholder": "新群組",
        "no_tools": "這個群組還沒有工具",
        "click_settings": "請點擊右上角設定來新增工具"
      },
      "tools": {
        "finance": "💰 財務",
        "plan": "✈️ 行前",
        "security": "🛡️ 安全",
        "life": "💡 生活",
        "exchange_rate": "💱 匯率換算",
        "ledger": "📒 旅遊帳本",
        "packing_list": "🧳 行李清單",
        "flashcards": "🗣️ 旅遊字卡",
        "unit_converter": "🌡️ 單位換算",
        "plug_guide": "🔌 插頭指南",
        "size_guide": "👟 尺寸對照"
      },
      "common": {
        "save": "儲存",
        "delete": "刪除",
        "cancel": "取消",
        "reset": "重置",
        "export": "匯出"
      }
    }
  },
  en: {
    translation: {
      "app": {
        "title": "🧰 Travel Toolkit",
        "subtitle": "Your All-in-One Travel Assistant",
        "footer": "Made for Travelers 🌍"
      },
      "groups": {
        "default": "Default",
        "add": "Add",
        "edit": "Edit Group",
        "settings": "Tool Settings",
        "new_placeholder": "New Group",
        "no_tools": "No tools in this group",
        "click_settings": "Click settings on top right to add tools"
      },
      "tools": {
        "finance": "💰 Finance",
        "plan": "✈️ Plan",
        "security": "🛡️ Security",
        "life": "💡 Life",
        "exchange_rate": "💱 Exchange Rate",
        "ledger": "📒 Trip Ledger",
        "packing_list": "🧳 Packing List",
        "flashcards": "🗣️ Flashcards",
        "unit_converter": "🌡️ Unit Converter",
        "plug_guide": "🔌 Plug Guide",
        "size_guide": "👟 Size Guide"
      },
      "common": {
        "save": "Save",
        "delete": "Delete",
        "cancel": "Cancel",
        "reset": "Reset",
        "export": "Export"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
