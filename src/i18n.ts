import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      "app": {
        "title": "🧰 旅遊瑞士刀",
        "subtitle": "您的全能旅遊助手",
        "footer": "Made for Travelers 🌍",
        "install_pwa": "安裝到手機"
      },
      "groups": {
        "default": "預設",
        "add": "新增",
        "edit": "編輯群組",
        "settings": "工具設定",
        "settings_desc": "勾選要在這個群組顯示的工具",
        "new_placeholder": "新群組",
        "no_tools": "這個群組還沒有工具",
        "click_settings": "請點擊右上角設定來新增工具",
        "rename": "重新命名",
        "at_least_one": "至少需保留一個群組"
      },
      "tools": {
        "finance": "💰 財務",
        "plan": "✈️ 行前",
        "security": "🛡️ 安全",
        "life": "💡 生活",
        "exchange_rate": "💱 匯率換算",
        "ledger": "📒 旅遊帳本",
        "packing_list": "🧳 行利清單",
        "flashcards": "🗣️ 旅遊字卡",
        "unit_converter": "⚖️ 單位換算",
        "plug_guide": "🔌 插頭指南",
        "size_guide": "👟 尺寸對照"
      },
      "exchange": {
        "title": "手動匯率換算",
        "desc": "輸入自定義匯率，精確換算外幣",
        "base": "基礎貨幣",
        "target": "目標貨幣",
        "set_rate": "設定匯率",
        "input_amount": "輸入金額",
        "result": "換算結果"
      },
      "ledger": {
        "title": "旅遊簡易記帳本",
        "desc": "記錄每一筆消費，輕鬆管理預算",
        "total": "累計總額 (不分幣別)",
        "note": "用途說明",
        "note_placeholder": "例如：拉麵、交通費",
        "amount": "金額",
        "currency": "貨幣",
        "add_record": "新增一筆紀錄",
        "list_title": "消費清單",
        "empty": "目前還沒有任何紀錄",
        "reset_confirm": "確定要清空所有記帳紀錄嗎？此動作無法復原。",
        "count": "共 {{count}} 筆"
      },
      "packing": {
        "title": "行李清單",
        "desc": "行前檢查，確保不遺漏任何必需品",
        "add_item": "新增行李...",
        "clear_all": "清空所有項目",
        "categories": {
          "essential": "必備證件",
          "electronics": "電子產品",
          "clothing": "衣物配件",
          "toiletries": "洗漱用品",
          "other": "其他"
        }
      },
      "flashcards": {
        "title": "旅遊字卡",
        "desc": "自定義個人旅遊常用短語與發音",
        "add_card": "新增字卡",
        "source_label": "來源內容",
        "target_label": "目標內容",
        "voice_label": "發音語言",
        "add_to_list": "加入清單",
        "empty": "尚無該語言配對的字卡",
        "click_plus": "點擊右上角 + 為此語言組合新增字卡",
        "phrases": {
          "hello": "你好",
          "thanks": "謝謝",
          "price": "這個多少錢？",
          "restroom": "請問廁所在哪裡？"
        }
      },
      "units": {
        "title": "全方位單位換算",
        "desc": "溫度、長度、重量一鍵轉換",
        "type": "轉換類型",
        "temp": "溫度 (°C ↔ °F)",
        "dist": "距離 (km ↔ mi)",
        "weight": "重量 (kg ↔ lb)"
      },
      "plugs": {
        "title": "全球插座與電壓",
        "desc": "查詢各國電壓與插頭規格",
        "select_country": "選擇國家/地區",
        "voltage": "電壓",
        "socket_type": "插座款式",
        "countries": {
          "JP": "日本",
          "US": "美國",
          "EU": "歐洲",
          "KR": "韓國",
          "TW": "台灣",
          "GB": "英國"
        }
      },
      "size": {
        "title": "全球尺寸對照",
        "desc": "各國衣服與鞋子尺寸換算",
        "category": "選擇類別",
        "categories": {
          "shoes": "👟 鞋子 (男/女)",
          "clothes": "👕 衣服 (男/女)"
        }
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
        "footer": "Made for Travelers 🌍",
        "install_pwa": "Install App"
      },
      "groups": {
        "default": "Default",
        "add": "Add",
        "edit": "Edit Group",
        "settings": "Settings",
        "settings_desc": "Select tools to display in this group",
        "new_placeholder": "New Group",
        "no_tools": "No tools in this group",
        "click_settings": "Click settings on top right to add tools",
        "rename": "Rename",
        "at_least_one": "Keep at least one group"
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
        "unit_converter": "⚖️ Unit Converter",
        "plug_guide": "🔌 Plug Guide",
        "size_guide": "👟 Size Guide"
      },
      "exchange": {
        "title": "Manual Exchange Rate",
        "desc": "Custom rate input for precise conversion",
        "base": "Base Currency",
        "target": "Target Currency",
        "set_rate": "Set Rate",
        "input_amount": "Input Amount",
        "result": "Result"
      },
      "ledger": {
        "title": "Simple Trip Ledger",
        "desc": "Track expenses and manage budget",
        "total": "Total Expenses (Mixed Currencies)",
        "note": "Description",
        "note_placeholder": "e.g., Ramen, Taxi",
        "amount": "Amount",
        "currency": "Currency",
        "add_record": "Add Record",
        "list_title": "Expense List",
        "empty": "No records found",
        "reset_confirm": "Are you sure you want to clear all records? This cannot be undone.",
        "count": "{{count}} records"
      },
      "packing": {
        "title": "Packing List",
        "desc": "Checklist to ensure you don't miss anything",
        "add_item": "Add item...",
        "clear_all": "Clear all",
        "categories": {
          "essential": "Essentials",
          "electronics": "Electronics",
          "clothing": "Clothing",
          "toiletries": "Toiletries",
          "other": "Other"
        }
      },
      "flashcards": {
        "title": "Travel Flashcards",
        "desc": "Custom travel phrases with pronunciation",
        "add_card": "Add Card",
        "source_label": "Source Content",
        "target_label": "Target Content",
        "voice_label": "Voice Language",
        "add_to_list": "Add to List",
        "empty": "No cards for this language pair",
        "click_plus": "Click + to add cards for this combination",
        "phrases": {
          "hello": "Hello",
          "thanks": "Thank You",
          "price": "How much is this?",
          "restroom": "Where is the restroom?"
        }
      },
      "units": {
        "title": "Unit Converter",
        "desc": "Convert temperature, distance, and weight",
        "type": "Conversion Type",
        "temp": "Temp (°C ↔ °F)",
        "dist": "Dist (km ↔ mi)",
        "weight": "Weight (kg ↔ lb)"
      },
      "plugs": {
        "title": "Global Plugs & Voltage",
        "desc": "Lookup voltage and plug types worldwide",
        "select_country": "Select Country/Region",
        "voltage": "Voltage",
        "socket_type": "Socket Type",
        "countries": {
          "JP": "Japan",
          "US": "USA",
          "EU": "Europe",
          "KR": "Korea",
          "TW": "Taiwan",
          "GB": "UK"
        }
      },
      "size": {
        "title": "Global Size Guide",
        "desc": "Convert clothes and shoe sizes",
        "category": "Select Category",
        "categories": {
          "shoes": "👟 Shoes (M/W)",
          "clothes": "👕 Clothes (M/W)"
        }
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