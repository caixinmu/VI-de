/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Package, 
  Store, 
  BookOpen, 
  Monitor, 
  Briefcase, 
  ChevronDown, 
  Check, 
  Zap,
  ArrowRight,
  Download,
  Loader2,
  X,
  FileText,
  Plus,
  MessageSquare
} from 'lucide-react';

interface VICategory {
  id: string;
  icon: ReactNode;
  title: string;
  desc: string;
  items: string[];
}

const VI_DATA: VICategory[] = [
  {
    id: 'base',
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: '基础识别系统',
    desc: '构建品牌的核心基因，注入光与科技的灵魂。',
    items: [
      '01 标志规范：企业Logo标准彩色稿、单色稿、反白稿',
      '02 标准字：公司全称中英文专用字体、印刷字体规范',
      '03 标准色：主色、辅助色色值 (CMYK/RGB)',
      '04 辅助图形：灯光射线、光影粒子、光晕波纹的辅助图形提炼',
      '05 组合规范：标志与“照明/Lighting”字样的标准横竖组合'
    ]
  },
  {
    id: 'product',
    icon: <Package className="w-8 h-8 text-orange-500" />,
    title: '产品与包装系统',
    desc: '让每一盏灯具，都成为你最好的品牌代言人。',
    items: [
      '灯体激光打标 / 丝印规范',
      '驱动器参数铭牌与 3C 认证排版',
      '产品包装彩盒 / 瓦楞纸外箱',
      '通用参数不干胶 / 条形码标签'
    ]
  },
  {
    id: 'spatial',
    icon: <Store className="w-8 h-8 text-green-500" />,
    title: '终端展厅与导视',
    desc: '沉浸式的光影体验，从踏入展厅的第一步开始。',
    items: [
      '经销商门头 / 户外灯箱招牌',
      '灯具专属：试灯台 / 体验台视觉',
      '亚克力参数标价牌 / 产品解说牌',
      '厂区大型发光字 / 部门科室门牌'
    ]
  },
  {
    id: 'marketing',
    icon: <BookOpen className="w-8 h-8 text-purple-500" />,
    title: '广告与营销物料',
    desc: '无论是画册还是屏幕，都能精准传达专业质感。',
    items: [
      '产品选型手册 (含配光曲线图排版)',
      '企业宣传画册 / 新品三折页',
      '定制手提袋 / 商务礼品',
      '展会文化衫 / 展位背景板设计'
    ]
  },
  {
    id: 'digital',
    icon: <Monitor className="w-8 h-8 text-indigo-500" />,
    title: '数字与线上系统',
    desc: '在数字世界中，延续无可挑剔的品牌体验。',
    items: [
      '官网首页 UI 风格与图标规范',
      '电商详情页 (场景图/光效图) 模板',
      '微信公众号 / 视频号视觉统一',
      '企业通用 PPT 演示文稿模板'
    ]
  },
  {
    id: 'office',
    icon: <Briefcase className="w-8 h-8 text-gray-500" />,
    title: '办公与事务应用',
    desc: '将严谨的工业精神，贯彻到日常办公的细枝末节。',
    items: [
      '高管及员工名片 / 厂区胸卡',
      '信纸 / 档案袋 / 文件夹',
      '对外报价单 / 采购合同版式',
      '生产线防静电工装 / 商务车体涂装'
    ]
  }
];

export default function App() {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submittedFile, setSubmittedFile] = useState<string | null>(null);

  const toggleItem = (categoryTitle: string, item: string) => {
    setSelections(prev => {
      const current = prev[categoryTitle] || [];
      const next = current.includes(item) 
        ? current.filter(i => i !== item)
        : [...current, item];
      
      const newSelections = { ...prev, [categoryTitle]: next };
      if (next.length === 0) delete newSelections[categoryTitle];
      return newSelections;
    });
  };

  const handleFinalSubmit = async () => {
    if (Object.keys(selections).length === 0) return;
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selections,
          additionalNotes,
          timestamp: new Date().toLocaleString()
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmittedFile(data.fileName);
        setSelections({}); // Clear selections after success
        setAdditionalNotes('');
        setIsConfirming(false);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const totalSelected = Object.values(selections).flat().length;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-blue-100">
      {/* Hero */}
      <header className="pt-24 pb-20 md:pt-32 md:pb-24 px-6 bg-black text-white text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[32px] md:text-[56px] font-semibold tracking-tight leading-tight mb-4"
        >
          点亮品牌的每一道光。
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[17px] md:text-[24px] text-[#a1a1a6] font-normal mb-8 md:mb-10"
        >
          专为照明企业打造的 Pro 级 VI 视觉系统。
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[15px] md:text-[21px] font-medium bg-gradient-to-r from-[#ffb443] via-[#ff4c4c] to-[#c040ff] bg-clip-text text-transparent inline-block"
        >
          更统一。更科技。更具吸引力。
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6">
        <h2 className="text-[28px] md:text-[40px] font-semibold text-center mb-10 md:mb-16 tracking-tight px-4">照明品牌VI设计项目</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {VI_DATA.map((cat, idx) => (
            <motion.div
              layout
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 md:hover:scale-[1.02] flex flex-col"
            >
              <div className="mb-6">
                <div className="text-[40px]">{cat.icon}</div>
              </div>

              <h3 className="text-[24px] font-semibold mb-3 tracking-tight">{cat.title}</h3>
              <p className="text-[15px] text-[#86868b] leading-tight mb-8">{cat.desc}</p>

              <ul className="space-y-0 divide-y divide-[#e5e5ea]">
                {cat.items.map(item => (
                  <li 
                    key={item}
                    onClick={() => toggleItem(cat.title, item)}
                    className="group flex items-center justify-between py-4 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mr-3" />
                      <span className="text-[15px] font-normal text-[#1d1d1f] tracking-tight">{item}</span>
                    </div>
                    
                    {/* Apple Style Checkbox at the end */}
                    <div className={`w-6 h-6 rounded-[6px] border-2 flex items-center justify-center transition-all ${
                      selections[cat.title]?.includes(item) 
                        ? 'bg-[#0066cc] border-[#0066cc]' 
                        : 'border-[#d2d2d7] group-hover:border-[#86868b]'
                    }`}>
                      {selections[cat.title]?.includes(item) && (
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <AnimatePresence>
        {totalSelected > 0 && !submittedFile && !isConfirming && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
          >
            <button 
              onClick={() => setIsConfirming(true)}
              className="bg-[#000000] text-white px-8 py-4 rounded-full font-semibold shadow-2xl flex items-center space-x-3 hover:scale-105 active:scale-95 transition-all text-sm tracking-tight"
            >
              <Check className="w-4 h-4" />
              <span>查看已选项目并提交 ({totalSelected})</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4 py-8 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-[#e5e5ea] flex justify-between items-center bg-[#fbfbfd]">
                <div>
                  <h3 className="text-[24px] font-semibold tracking-tight">确认您的选择</h3>
                  <p className="text-[14px] text-[#86868b]">请核对清单，并添加任何额外需求。</p>
                </div>
                <button 
                  onClick={() => setIsConfirming(false)}
                  className="p-2 bg-[#e5e5ea] rounded-full hover:bg-[#d2d2d7] transition-colors"
                >
                  <X className="w-5 h-5 text-[#1d1d1f]" />
                </button>
              </div>

              {/* Scrollable Summary */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                <div className="space-y-6">
                  {(Object.entries(selections) as [string, string[]][]).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="text-[13px] font-bold text-[#0066cc] uppercase tracking-wider">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {items.map(item => (
                          <div key={item} className="flex items-center space-x-2 bg-[#f5f5f7] p-3 rounded-xl border border-[#e5e5ea]">
                            <Check className="w-4 h-4 text-[#32d74b]" />
                            <span className="text-[14px] font-medium text-[#1d1d1f] tracking-tight truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Supplementary Notes Section */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                      <Plus className="w-4 h-4" />
                    </div>
                    <h4 className="text-[17px] font-semibold tracking-tight">补充其它项目</h4>
                  </div>
                  <div className="relative">
                    <textarea 
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="如果您有其它特殊的 VI 需求或备注，请在此输入..."
                      className="w-full h-32 p-4 bg-[#f5f5f7] border-2 border-transparent focus:border-[#0066cc] focus:bg-white rounded-[20px] outline-none transition-all text-[15px] resize-none tracking-tight"
                    />
                    <div className="absolute right-4 bottom-4 text-[#86868b]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 md:p-8 border-t border-[#e5e5ea] bg-[#fbfbfd] flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <button 
                  onClick={() => setIsConfirming(false)}
                  className="flex-1 py-4 bg-[#e5e5ea] text-[#1d1d1f] rounded-2xl font-bold text-[15px] tracking-tight hover:bg-[#d2d2d7] transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="flex-[2] py-4 bg-[#000000] text-white rounded-2xl font-bold text-[15px] tracking-tight hover:bg-[#1d1d1f] flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  <span>完成核对并提交清单</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {submittedFile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border border-[#d2d2d7] p-10 rounded-[32px] max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-[#32d74b] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                <Check className="w-8 h-8" strokeWidth={3} />
              </div>
              <h4 className="text-[24px] font-semibold mb-2">需求清单已生成</h4>
              <p className="text-[14px] text-[#86868b] mb-8 font-mono">{submittedFile}</p>
              <button 
                onClick={() => setSubmittedFile(null)}
                className="w-full py-4 bg-[#1d1d1f] text-white rounded-2xl font-bold text-sm tracking-tight hover:bg-black transition-colors"
              >
                好的
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 px-6 text-center border-t border-[#d2d2d7] bg-white">
        <p className="text-[12px] text-[#86868b]">此设计清单专为照明灯具行业优化。Copyright © 2026. All rights reserved.</p>
      </footer>
    </div>
  );
}
