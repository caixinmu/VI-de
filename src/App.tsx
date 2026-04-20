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
  Loader2
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
      '品牌标志 (Logo) 规范与网格制图',
      '品牌主色与辅助色 (CMYK/RGB/HEX)',
      '中英文字体库与排版规范',
      '辅助图形 (光束/电路纹理等延展)'
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async () => {
    if (Object.keys(selections).length === 0) return;
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selections,
          timestamp: new Date().toLocaleString()
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmittedFile(data.fileName);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const totalSelected = Object.values(selections).flat().length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-400 selection:text-slate-950 p-4 md:p-6 lg:p-8">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)]">
            <Zap className="h-5 w-5 text-slate-900 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">VI-PRO <span className="font-light opacity-50 text-slate-400 font-mono tracking-widest text-xs">SOLUTIONS</span></span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
           {['Overview', 'Base VI', 'Space', 'Digital'].map(nav => (
            <span key={nav} className="cursor-pointer hover:text-amber-400 transition-colors">
              {nav}
            </span>
          ))}
        </div>

        <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold hover:bg-slate-800 transition-colors uppercase tracking-widest text-slate-400">
          DOCS
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 lg:grid-rows-3 gap-4 lg:min-h-[80vh]">
        
        {/* Main Bento Hero Card */}
        <div className="md:col-span-4 lg:col-span-2 lg:row-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <div className="w-96 h-96 border-[0.5px] border-slate-400 rounded-full flex items-center justify-center">
              <div className="w-64 h-64 border-[0.5px] border-slate-400 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border-[0.5px] border-slate-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <span className="px-3 py-1 bg-amber-400/10 text-amber-400 text-[10px] font-bold tracking-widest rounded-full uppercase border border-amber-400/20">
              Lighting VI Pro
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-8 leading-[1.1] tracking-tight">
              点亮品牌的<br/>每一道光。
            </h1>
            <p className="mt-6 text-slate-400 max-w-sm text-sm leading-relaxed">
              专为照明企业打造的 Pro 级 VI 视觉系统。更统一，更科技，更具吸引力。
            </p>
          </div>

          <div className="flex items-end justify-between relative z-10 mt-12">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-amber-400 border-2 border-slate-900 rounded-full shadow-lg"></div>
              <div className="w-10 h-10 bg-slate-300 border-2 border-slate-900 rounded-full"></div>
              <div className="w-10 h-10 bg-slate-700 border-2 border-slate-900 rounded-full"></div>
            </div>
            
            <div className="flex space-x-2">
              {totalSelected > 0 && (
                <button 
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-3 bg-amber-400 text-slate-950 rounded-xl font-bold text-sm hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center"
                >
                  {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                  生成清单 {totalSelected > 0 && `(${totalSelected})`}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Bento Grid */}
        {VI_DATA.map((cat, idx) => (
          <motion.div
            layout
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`cursor-pointer bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between group hover:border-slate-700 transition-colors ${
              idx === 0 ? 'md:col-span-2 lg:col-span-1' : 
              idx === 1 ? 'md:col-span-2 lg:col-span-1' :
              idx === 2 ? 'md:col-span-2 lg:col-span-2' :
              'md:col-span-2 lg:col-span-1'
            } ${expandedId === cat.id ? 'ring-2 ring-amber-400/50 bg-slate-900' : ''}`}
            onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                  {cat.icon}
                </div>
                {expandedId === cat.id ? <Check className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />}
              </div>
              <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{cat.desc}</p>
            </div>

            <AnimatePresence>
              {expandedId === cat.id ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <ul className="space-y-2">
                    {cat.items.map(item => (
                      <li 
                        key={item}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(cat.title, item);
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg text-[11px] transition-colors ${
                          selections[cat.title]?.includes(item) ? 'bg-amber-400/10 text-amber-400' : 'hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="flex-1">{item}</span>
                        {selections[cat.title]?.includes(item) && <Check className="w-3 h-3 ml-2" />}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <div className="mt-8 flex justify-between items-center text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                  <span>{cat.items.length} 条规范</span>
                  <span className="group-hover:text-amber-400 transition-colors">详情 +</span>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 border-t border-slate-900 space-y-4 md:space-y-0">
        <p>© 2026 LUX-VI LIGHTING DESIGN SOLUTIONS. ALL ASSETS COMPLIANT WITH GB/T STANDARDS.</p>
        <div className="flex space-x-6">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            SERVER SYNC ACTIVE
          </span>
          <span className="font-mono opacity-50 tracking-widest">BUILD 5.1.0-STABLE</span>
        </div>
      </footer>

      {/* Global Success Notification */}
      <AnimatePresence>
        {submittedFile && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-6"
          >
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 mx-auto mb-6 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                <Check className="w-8 h-8" strokeWidth={3} />
              </div>
              <h4 className="text-xl font-bold mb-2">生成成功</h4>
              <p className="text-sm text-slate-400 mb-8 font-mono">{submittedFile}</p>
              <button 
                onClick={() => setSubmittedFile(null)}
                className="w-full py-4 bg-amber-400 text-slate-950 rounded-2xl font-bold text-sm tracking-widest uppercase hover:scale-[1.02] transition-transform active:scale-95"
              >
                回到系统
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
