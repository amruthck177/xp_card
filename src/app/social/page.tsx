"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, Share2, Heart, 
  Repeat2, MoreHorizontal, Video, Image as ImageIcon,
  Code, Hash, Search, Bell, PlusCircle, ExternalLink
} from 'lucide-react';

const posts = [
  {
    id: 1,
    user: 'CyberArch',
    handle: '@cyber_arch',
    level: 72,
    content: 'Just deployed a new microservices architecture for the Dev City Mall. Check out the low-latency response times! 🚀',
    code: `const response = await mesh.request('mall-service', {
  action: 'get_inventory',
  priority: 'high'
});`,
    likes: 1200,
    comments: 45,
    reposts: 12,
    time: '2h ago'
  },
  {
    id: 2,
    user: 'CodeQueen',
    handle: '@cq_dev',
    level: 45,
    content: 'Who else feels like this when debugging an infinite loop? 😂 #codingmemes #devlife',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    likes: 850,
    comments: 32,
    reposts: 5,
    time: '4h ago'
  }
];

export default function SocialNetwork() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Left */}
        <div className="hidden lg:block space-y-6">
           <div className="glass p-6 rounded-3xl border-white/5">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-1">
                    <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center font-black">JS</div>
                 </div>
                 <div>
                    <h3 className="font-bold">John Script</h3>
                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">LVL 52 ARCHITECT</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <SidebarLink icon={<Users className="w-4 h-4" />} label="Community" count="12k" />
                 <SidebarLink icon={<MessageSquare className="w-4 h-4" />} label="Real-time Rooms" count="42" active />
                 <SidebarLink icon={<Video className="w-4 h-4" />} label="Tech Reels" count="1.2k" />
                 <SidebarLink icon={<Hash className="w-4 h-4" />} label="Trending Topics" />
              </div>
           </div>

           <div className="glass p-6 rounded-3xl border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                 {['#rust', '#nextjs15', '#ai_agents', '#web3', '#debug_challenge'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60 hover:text-neon-cyan cursor-pointer transition-colors">
                      {tag}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           {/* Post Input */}
           <div className="glass p-6 rounded-3xl border-white/5">
              <div className="flex gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                 <textarea 
                   placeholder="Share your logic, memes, or code..." 
                   className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 resize-none h-20"
                 />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                 <div className="flex gap-4">
                    <button className="text-white/40 hover:text-neon-cyan transition-colors"><ImageIcon className="w-5 h-5" /></button>
                    <button className="text-white/40 hover:text-neon-purple transition-colors"><Code className="w-5 h-5" /></button>
                    <button className="text-white/40 hover:text-yellow-400 transition-colors"><PlusCircle className="w-5 h-5" /></button>
                 </div>
                 <button className="px-6 py-2 bg-neon-cyan text-black font-bold rounded-xl text-sm hover:scale-105 transition-transform">POST</button>
              </div>
           </div>

           {/* Posts */}
           {posts.map((post) => (
             <motion.div 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass p-6 rounded-3xl border-white/5 group"
             >
                <div className="flex items-start justify-between mb-4">
                   <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10" />
                      <div>
                         <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm">{post.user}</h4>
                            <span className="text-[10px] bg-neon-cyan/20 text-neon-cyan px-1.5 py-0.5 rounded font-black">LVL {post.level}</span>
                         </div>
                         <span className="text-xs text-white/30">{post.handle} • {post.time}</span>
                      </div>
                   </div>
                   <button className="text-white/20 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                </div>

                <p className="text-sm text-white/80 leading-relaxed mb-4">
                   {post.content}
                </p>

                {post.code && (
                  <div className="bg-black/40 rounded-2xl p-4 font-mono text-xs text-neon-cyan/80 mb-4 border border-white/5">
                     <pre><code>{post.code}</code></pre>
                  </div>
                )}

                {post.image && (
                  <div className="rounded-2xl overflow-hidden mb-4 border border-white/5">
                     <img src={post.image} alt="post" className="w-full h-auto" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex gap-6">
                      <ActionButton icon={<MessageSquare className="w-4 h-4" />} count={post.comments} color="blue" />
                      <ActionButton icon={<Repeat2 className="w-4 h-4" />} count={post.reposts} color="green" />
                      <ActionButton icon={<Heart className="w-4 h-4" />} count={post.likes} color="red" />
                   </div>
                   <button className="text-white/20 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Sidebar Right */}
        <div className="hidden lg:block space-y-6">
           <div className="glass p-6 rounded-3xl border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center justify-between">
                 Active Rooms
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </h3>
              <div className="space-y-4">
                 <RoomItem title="React 19 Deep Dive" players={12} color="cyan" />
                 <RoomItem title="Rust for Web Dev" players={8} color="orange" />
                 <RoomItem title="AI Agent Hackathon" players={24} color="purple" />
              </div>
              <button className="w-full mt-6 py-3 border border-neon-cyan/20 text-neon-cyan text-xs font-black rounded-xl hover:bg-neon-cyan/10 transition-all uppercase">Browse All Rooms</button>
           </div>

           <div className="glass p-6 rounded-3xl border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-6">Who to Follow</h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/5" />
                         <div>
                            <div className="text-xs font-bold">DevMaster_{i}</div>
                            <div className="text-[10px] text-white/40 uppercase font-black">LVL 40</div>
                         </div>
                      </div>
                      <button className="text-neon-cyan text-[10px] font-black uppercase">Follow</button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const SidebarLink = ({ icon, label, count, active }: { icon: React.ReactNode; label: string; count?: string; active?: boolean }) => (
  <div className={`flex items-center justify-between group cursor-pointer ${active ? 'text-neon-cyan' : 'text-white/60 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
    {count && <span className="text-[10px] font-black bg-white/5 px-1.5 py-0.5 rounded text-white/40">{count}</span>}
  </div>
);

const ActionButton = ({ icon, count, color }: { icon: React.ReactNode; count: number; color: string }) => (
  <button className={`flex items-center gap-2 text-white/40 hover:text-${color}-400 transition-colors`}>
    {icon}
    <span className="text-xs font-bold">{count}</span>
  </button>
);

const RoomItem = ({ title, players, color }: { title: string; players: number; color: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5">
    <div>
      <div className="text-xs font-bold">{title}</div>
      <div className="text-[10px] text-white/40 font-bold uppercase">{players} Coding Now</div>
    </div>
    <div className={`w-2 h-2 rounded-full bg-neon-${color}`} />
  </div>
);
