'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreative } from '@/context/CreativeContext';

export default function HomePage() {
  const { projects, createProject, deleteProject, selectProject } = useCreative();
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCreateProject = () => {
    if (newTitle.trim()) {
      createProject(newTitle, newDescription);
      setNewTitle('');
      setNewDescription('');
      setShowCreateForm(false);
    }
  };

  const handleSelectProject = (id: string) => {
    selectProject(id);
    router.push('/dashboard');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('정말로 이 소설을 삭제하시겠습니까?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600">
      <header className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold">ThankYou Navy</div>
          <div className="text-white/90">&nbsp;</div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div className="lg:pr-12">
              <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight">Somni</h1>
              <p className="mt-6 text-lg text-white/90 max-w-xl">AI와 함께 창작을 더 빠르고 즐겁게 — 소설 작성, 캐릭터 관리, 스토리보드를 한 곳에서.</p>
              <div className="mt-8 flex gap-4">
                <button onClick={() => setShowCreateForm(true)} className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg">새 소설 추가</button>
                <button onClick={() => router.push('/dashboard')} className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold border border-white/30">대시보드로 이동</button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <img src="/file.svg" alt="mascot" className="w-64 md:w-80 lg:w-96 drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* white rounded overlay */}
        <div className="bg-white rounded-t-3xl -mt-12 pt-12">
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-6">
              {projects.length === 0 ? (
                <div className="col-span-full bg-white/80 border border-indigo-100 rounded-2xl p-8 shadow">
                  <h3 className="text-2xl font-semibold text-indigo-600 mb-2">아직 소설이 없습니다</h3>
                  <p className="text-gray-600 mb-4">새 소설을 추가해 창작을 시작해보세요.</p>
                  <button onClick={() => setShowCreateForm(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-full">소설 추가</button>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow hover:shadow-lg transition">
                    <h4 className="text-lg font-semibold text-indigo-600">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => handleSelectProject(project.id)} className="px-4 py-2 bg-green-500 text-white rounded-full">선택</button>
                      <button onClick={() => handleDeleteProject(project.id)} className="px-4 py-2 bg-red-500 text-white rounded-full">삭제</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCreateForm(false)} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4">새 소설 추가</h3>
            <input type="text" placeholder="소설 제목" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl mb-4" />
            <textarea placeholder="소설 설명" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl mb-6" rows={4} />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCreateForm(false)} className="px-4 py-2 rounded-full border">취소</button>
              <button onClick={handleCreateProject} className="px-5 py-2 rounded-full bg-indigo-600 text-white">추가</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
