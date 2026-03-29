/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  ClipboardList, 
  GraduationCap, 
  LogOut, 
  User as UserIcon,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Save,
  Trash2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject, Student, Grade, Attendance, Lesson, Homework, PlannedActivity, User, WeeklySchedule, SchoolClass, Note, Meeting } from './types';
import { SUBJECTS, HOURS, DAYS_OF_WEEK, DEFAULT_WEEKLY_SCHEDULE, MOCK_CLASSES } from './constants';

// --- Components ---

const Button = ({ children, onClick, className = "", variant = "primary" }: any) => {
  const variants: any = {
    primary: "bg-brand-primary text-white hover:bg-blue-800 shadow-sm",
    secondary: "bg-brand-secondary text-white hover:bg-orange-600 shadow-sm",
    success: "bg-brand-success text-white hover:bg-green-700 shadow-sm",
    danger: "bg-brand-danger text-white hover:bg-red-700 shadow-sm",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    white: "bg-white text-brand-primary hover:bg-slate-50 shadow-sm"
  };
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", padding = "p-5" }: any) => (
  <div className={`bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden ${padding} ${className}`}>
    {children}
  </div>
);

// --- Main App ---

export default function App() {
  const STORAGE_KEYS = {
    USER: 'argo_user',
    CLASSES: 'argo_classes',
    GRADES: 'argo_grades',
    ATTENDANCE: 'argo_attendance',
    LESSONS: 'argo_lessons',
    HOMEWORK: 'argo_homework',
    ACTIVITIES: 'argo_activities',
    NOTES: 'argo_notes',
    MEETINGS: 'argo_meetings'
  };

  // Initial State Loaders
  const loadInitial = (key: string, fallback: any) => {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return fallback;
    }
  };

  const [user, setUser] = useState<User | null>(() => loadInitial(STORAGE_KEYS.USER, null));
  const [view, setView] = useState<'dashboard' | 'register' | 'lessons' | 'homework' | 'agenda' | 'schedule' | 'subjects' | 'classes' | 'notes' | 'meetings'>('dashboard');
  const [selectedClassId, setSelectedClassId] = useState('3A');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  const [classes, setClasses] = useState<SchoolClass[]>(() => loadInitial(STORAGE_KEYS.CLASSES, MOCK_CLASSES));
  const [grades, setGrades] = useState<Grade[]>(() => loadInitial(STORAGE_KEYS.GRADES, []));
  const [attendance, setAttendance] = useState<Attendance[]>(() => loadInitial(STORAGE_KEYS.ATTENDANCE, []));
  const [lessons, setLessons] = useState<Lesson[]>(() => loadInitial(STORAGE_KEYS.LESSONS, []));
  const [homework, setHomework] = useState<Homework[]>(() => loadInitial(STORAGE_KEYS.HOMEWORK, []));
  const [activities, setActivities] = useState<PlannedActivity[]>(() => loadInitial(STORAGE_KEYS.ACTIVITIES, []));
  const [notes, setNotes] = useState<Note[]>(() => loadInitial(STORAGE_KEYS.NOTES, []));
  const [meetings, setMeetings] = useState<Meeting[]>(() => loadInitial(STORAGE_KEYS.MEETINGS, []));

  // Persistence Effects
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades)); }, [grades]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons)); }, [lessons]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.HOMEWORK, JSON.stringify(homework)); }, [homework]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings)); }, [meetings]);

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0] || MOCK_CLASSES[0];
  
  // Update class data (subjects or schedule)
  const updateClassData = (updatedClass: SchoolClass) => {
    setClasses(classes.map(c => c.id === updatedClass.id ? updatedClass : c));
  };
  
  // Login Simulation
  const handleLogin = (username: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      username,
      name: 'L. BATTISTIN',
      role: 'Docente'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setView('dashboard');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-flex w-24 h-24 bg-brand-primary/10 rounded-3xl items-center justify-center mb-6 rotate-3">
              <GraduationCap size={56} className="text-brand-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Argo DidUP</h1>
            <p className="text-slate-500 mt-2 font-medium">Registro Elettronico Docenti</p>
          </div>

          <Card padding="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Username</label>
                <input 
                  type="text" 
                  placeholder="es. rossi"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-brand-primary focus:ring-0 outline-none transition-all bg-slate-50/50"
                  id="username-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-brand-primary focus:ring-0 outline-none transition-all bg-slate-50/50"
                />
              </div>
              <Button 
                className="w-full py-4 text-lg mt-4"
                onClick={() => {
                  const input = document.getElementById('username-input') as HTMLInputElement;
                  handleLogin(input.value || 'rossi');
                }}
              >
                Accedi al Registro
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500 font-medium">Oppure</span>
                </div>
              </div>
              
              <button 
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border-2 border-slate-100 hover:bg-slate-50 transition-all font-medium text-slate-700"
                onClick={() => handleLogin('google_user')}
              >
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
                Accedi con Google
              </button>
            </div>
          </Card>
          
          <p className="mt-10 text-center text-sm text-slate-400 font-medium">
            © 2026 Argo Software S.r.l. • Versione 4.0
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-brand-primary text-white px-6 py-5 shadow-lg flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-xl">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight">Argo DidUP</h1>
            <div className="flex items-center gap-2 text-xs font-semibold opacity-90">
              <span className="bg-white/20 px-2 py-0.5 rounded uppercase">{currentClass.name}</span>
              <span>•</span>
              <span>{user.name}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2.5 hover:bg-white/10 rounded-xl transition-colors border border-white/20"
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full pb-24">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Bentornato, Prof. {user.name.split(' ')[1]}</h2>
                  <p className="text-slate-500 font-medium">
                    {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                </div>
                <div className="hidden sm:block flex gap-2">
                  <Button variant="outline" className="text-sm" onClick={() => setView('subjects')}>Materie</Button>
                  <Button variant="outline" className="text-sm" onClick={() => setView('classes')}>Cambia Classe</Button>
                </div>
              </div>

              {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                  <QuickAction 
                    icon={<Users size={28} className="text-brand-primary" />} 
                    label="Appello" 
                    color="bg-blue-50"
                    borderColor="border-blue-100"
                    onClick={() => setView('register')}
                  />
                  <QuickAction 
                    icon={<BookOpen size={28} className="text-brand-secondary" />} 
                    label="Lezioni" 
                    color="bg-orange-50"
                    borderColor="border-orange-100"
                    onClick={() => setView('lessons')}
                  />
                  <QuickAction 
                    icon={<ClipboardList size={28} className="text-brand-success" />} 
                    label="Compiti" 
                    color="bg-green-50"
                    borderColor="border-green-100"
                    onClick={() => setView('homework')}
                  />
                  <QuickAction 
                    icon={<Calendar size={28} className="text-purple-600" />} 
                    label="Agenda" 
                    color="bg-purple-50"
                    borderColor="border-purple-100"
                    onClick={() => setView('agenda')}
                  />
                  <QuickAction 
                    icon={<UserIcon size={28} className="text-red-600" />} 
                    label="Colloqui" 
                    color="bg-red-50"
                    borderColor="border-red-100"
                    onClick={() => setView('meetings')}
                  />
                </div>

              {/* Today's Schedule */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                      <Clock size={18} className="text-brand-primary" />
                    </div>
                    Orario Odierno
                  </h2>
                  <Button 
                    variant="ghost" 
                    className="text-xs font-bold text-brand-primary bg-blue-50 px-3 py-1 rounded-full h-auto"
                    onClick={() => setView('schedule')}
                  >
                    Modifica Orario
                  </Button>
                </div>
                <div className="grid gap-4">
                  {HOURS.map(h => {
                    const currentDay = new Date().getDay();
                    // Map Sunday (0) to 1 (Lunedì) for demo purposes if it's weekend, or just use 1
                    const dayToFetch = (currentDay === 0 || currentDay === 6) ? 1 : currentDay;
                    const subject = currentClass.schedule[dayToFetch]?.[h] || 'Nessuna';
                    
                    return (
                      <Card key={h} padding="p-0" className="group">
                        <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                              {h}°
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-lg">
                                {subject}
                              </p>
                              <p className="text-sm text-slate-500 font-medium">Classe {currentClass.name} • Aula 12</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-widest">Dettagli</span>
                            <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'register' && (
            <motion.div 
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                    <ArrowLeft size={24} className="text-slate-600" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Registro Classe {currentClass.name}</h2>
                    <p className="text-slate-500 font-medium">Appello e Valutazioni</p>
                  </div>
                </div>
                <Button variant="outline" className="text-sm hidden sm:flex">Stampa Registro</Button>
              </div>

              <Card padding="p-0">
                <div className="divide-y divide-slate-100">
                  {currentClass.students.map((student, idx) => (
                    <div key={student.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div 
                        className="flex items-center gap-5 cursor-pointer group"
                        onClick={() => setSelectedStudentId(student.id)}
                      >
                        <span className="text-slate-300 font-bold text-sm w-6">{idx + 1}</span>
                        <div>
                          <p className="font-bold text-slate-900 uppercase tracking-tight leading-tight group-hover:text-brand-primary transition-colors">{student.surname}</p>
                          <p className="text-slate-500 text-sm font-medium">{student.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <AttendanceBadge studentId={student.id} classId={currentClass.id} attendance={attendance} setAttendance={setAttendance} />
                        <div className="w-px h-8 bg-slate-100" />
                        <GradeButton student={student} classId={currentClass.id} grades={grades} setGrades={setGrades} subjects={currentClass.subjects} />
                        <div className="w-px h-8 bg-slate-100" />
                        <NoteButton student={student} classId={currentClass.id} notes={notes} setNotes={setNotes} author={user.name} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {view === 'lessons' && (
            <motion.div 
              key="lessons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Giornale di Classe</h2>
                  <p className="text-slate-500 font-medium">Registra le attività svolte</p>
                </div>
              </div>

              <LessonForm onSave={(lesson) => setLessons([...lessons, { ...lesson, classId: currentClass.id }])} subjects={currentClass.subjects} author={user.name} />

              <div className="space-y-5">
                <h3 className="text-lg font-bold text-slate-800">Lezioni Recenti</h3>
                {lessons.filter(l => l.classId === currentClass.id).length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <BookOpen size={48} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-slate-400 font-medium">Nessuna lezione registrata oggi.</p>
                  </div>
                ) : (
                  lessons.filter(l => l.classId === currentClass.id).map(l => (
                    <Card key={l.id} className="border-l-4 border-l-brand-primary">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-50 text-brand-primary rounded-lg text-xs font-bold uppercase tracking-wider">
                            {l.hour}° Ora • {l.subject}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{l.date}</span>
                      </div>
                      <p className="font-bold text-slate-900 text-lg">{l.topic}</p>
                      <p className="text-slate-600 mt-2 leading-relaxed">{l.description}</p>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {view === 'homework' && (
            <motion.div key="homework" className="space-y-8">
               <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Compiti Assegnati</h2>
                  <p className="text-slate-500 font-medium">Gestisci il lavoro a casa</p>
                </div>
              </div>
              <HomeworkForm onSave={(h) => setHomework([...homework, { ...h, classId: currentClass.id }])} subjects={currentClass.subjects} author={user.name} />
              <div className="grid gap-5">
                {homework.filter(h => h.classId === currentClass.id).map(h => (
                  <Card key={h.id} className="border-l-4 border-l-brand-secondary">
                    <div className="flex justify-between items-start">
                      <p className="font-extrabold text-brand-secondary uppercase tracking-wider text-sm">{h.subject}</p>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                        <Calendar size={12} />
                        Scadenza: {h.dueDate}
                      </div>
                    </div>
                    <p className="mt-3 text-slate-700 font-medium leading-relaxed">{h.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'agenda' && (
            <motion.div key="agenda" className="space-y-8">
               <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Agenda e Verifiche</h2>
                  <p className="text-slate-500 font-medium">Pianificazione attività</p>
                </div>
              </div>
              <ActivityForm onSave={(a) => setActivities([...activities, { ...a, classId: currentClass.id }])} />
              <div className="grid gap-5">
                {activities.filter(a => a.classId === currentClass.id).map(a => (
                  <Card key={a.id} className="border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start">
                      <p className="font-extrabold text-purple-600 uppercase tracking-wider text-sm">{a.title}</p>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                        <Calendar size={12} />
                        {a.date}
                      </div>
                    </div>
                    <p className="mt-3 text-slate-700 font-medium leading-relaxed">{a.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'schedule' && (
            <motion.div 
              key="schedule"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Orario Settimanale</h2>
                  <p className="text-slate-500 font-medium">Personalizza le tue materie</p>
                </div>
              </div>

              <ScheduleEditor 
                schedule={currentClass.schedule} 
                setSchedule={(newSchedule) => updateClassData({ ...currentClass, schedule: newSchedule })} 
                subjects={currentClass.subjects}
              />
            </motion.div>
          )}

          {view === 'subjects' && (
            <motion.div 
              key="subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Gestione Materie</h2>
                  <p className="text-slate-500 font-medium">Aggiungi o rimuovi materie dal registro</p>
                </div>
              </div>

              <SubjectManager 
                subjects={currentClass.subjects} 
                setSubjects={(newSubjects) => updateClassData({ ...currentClass, subjects: newSubjects })} 
              />
            </motion.div>
          )}

          {view === 'classes' && (
            <motion.div 
              key="classes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Cambia Classe</h2>
                  <p className="text-slate-500 font-medium">Seleziona la classe su cui lavorare</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map(c => (
                  <Card 
                    key={c.id} 
                    padding="p-0" 
                    className={`cursor-pointer transition-all hover:shadow-xl ${selectedClassId === c.id ? 'ring-4 ring-brand-primary/20 border-brand-primary' : ''}`}
                  >
                    <div 
                      className="p-8 flex flex-col items-center text-center gap-4"
                      onClick={() => {
                        setSelectedClassId(c.id);
                        setView('dashboard');
                      }}
                    >
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${selectedClassId === c.id ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <Users size={40} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">Classe {c.name}</h3>
                        <p className="text-slate-500 font-medium mt-1">{c.students.length} Studenti • {c.subjects.length} Materie</p>
                      </div>
                      {selectedClassId === c.id && (
                        <div className="bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                          Classe Attiva
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'meetings' && (
            <motion.div 
              key="meetings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Colloqui con i Genitori</h2>
                  <p className="text-slate-500 font-medium">Gestione incontri e verbali</p>
                </div>
              </div>

              <MeetingForm 
                students={currentClass.students} 
                onSave={(m) => setMeetings([...meetings, { ...m, author: user.name }])} 
              />

              <div className="space-y-5">
                <h3 className="text-lg font-bold text-slate-800">Storico Colloqui</h3>
                {meetings.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <UserIcon size={48} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-slate-400 font-medium">Nessun colloquio registrato.</p>
                  </div>
                ) : (
                  meetings.map(m => {
                    const student = currentClass.students.find(s => s.id === m.studentId);
                    return (
                      <Card key={m.id} className="border-l-4 border-l-red-500">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                              {student ? `${student.surname} ${student.name}` : 'Studente non trovato'}
                            </span>
                            <span className="text-xs font-bold text-slate-500">Genitore: {m.parentName}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400">{m.date}</p>
                            <p className="text-xs font-bold text-slate-400">{m.time}</p>
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{m.notes}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-tighter">Docente: {m.author}</p>
                      </Card>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {view === 'notes' && (
            <motion.div 
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('dashboard')} className="p-2.5 hover:bg-slate-200 rounded-xl transition-colors">
                  <ArrowLeft size={24} className="text-slate-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Note Disciplinari</h2>
                  <p className="text-slate-500 font-medium">Visualizza e gestisci le note della classe {currentClass.name}</p>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-blue-50/30 border-blue-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Aggiungi Nota Generica di Classe</h3>
                  <div className="space-y-4">
                    <textarea 
                      id="generic-note-input"
                      placeholder="Scrivi qui la nota per l'intera classe..."
                      className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-brand-primary h-24 resize-none"
                    />
                    <Button 
                      className="w-full"
                      onClick={() => {
                        const input = document.getElementById('generic-note-input') as HTMLTextAreaElement;
                        if (input.value) {
                          const newNote: Note = {
                            id: Math.random().toString(),
                            classId: currentClass.id,
                            type: 'Generica',
                            description: input.value,
                            date: new Date().toLocaleDateString(),
                            author: user.name
                          };
                          setNotes([...notes, newNote]);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus size={20} /> Inserisci Nota di Classe
                    </Button>
                  </div>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800">Cronologia Note</h3>
                  {notes.filter(n => n.classId === currentClass.id).length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                      <ClipboardList size={48} className="mx-auto text-slate-200 mb-3" />
                      <p className="text-slate-400 font-medium">Nessuna nota presente per questa classe.</p>
                    </div>
                  ) : (
                    notes.filter(n => n.classId === currentClass.id).map(n => {
                      const student = n.studentId ? currentClass.students.find(s => s.id === n.studentId) : null;
                      return (
                        <Card key={n.id} className={`border-l-4 ${n.type === 'Merito' ? 'border-l-green-500' : n.type === 'Individuale' ? 'border-l-orange-500' : 'border-l-blue-500'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                                n.type === 'Merito' ? 'bg-green-100 text-green-700' : 
                                n.type === 'Individuale' ? 'bg-orange-100 text-orange-700' : 
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {n.type}
                              </span>
                              {student && (
                                <span className="text-sm font-bold text-slate-700">
                                  {student.surname} {student.name}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{n.date}</span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed">{n.description}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Docente: {n.author}</p>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {selectedStudentId && currentClass.students.find(s => s.id === selectedStudentId) && (
        <StudentProfile 
          student={currentClass.students.find(s => s.id === selectedStudentId)!}
          grades={grades.filter(g => g.studentId === selectedStudentId)}
          notes={notes.filter(n => n.studentId === selectedStudentId)}
          onClose={() => setSelectedStudentId(null)}
        />
      )}

      <nav className="bg-white/80 backdrop-blur-lg border-t border-slate-200 p-3 flex justify-around items-center fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
        <NavButton active={view === 'dashboard'} icon={<Calendar size={22} />} label="Oggi" onClick={() => setView('dashboard')} />
        <NavButton active={view === 'register'} icon={<Users size={22} />} label="Registro" onClick={() => setView('register')} />
        <NavButton active={view === 'meetings'} icon={<UserIcon size={22} />} label="Colloqui" onClick={() => setView('meetings')} />
        <NavButton active={view === 'lessons'} icon={<BookOpen size={22} />} label="Lezioni" onClick={() => setView('lessons')} />
        <NavButton active={view === 'homework'} icon={<ClipboardList size={22} />} label="Compiti" onClick={() => setView('homework')} />
      </nav>
    </div>
  );
}

// --- Sub-components ---

function QuickAction({ icon, label, color, borderColor, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`${color} ${borderColor} border p-6 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-sm`}
    >
      <div className="bg-white p-3 rounded-2xl shadow-sm">
        {icon}
      </div>
      <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{label}</span>
    </button>
  );
}

function NavButton({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${active ? 'text-brand-primary bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      {icon}
      <span className={`text-[11px] font-bold uppercase tracking-wider ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
    </button>
  );
}

function AttendanceBadge({ studentId, classId, attendance, setAttendance }: any) {
  const [showModal, setShowModal] = useState(false);
  const current = attendance.find((a: any) => a.studentId === studentId && a.classId === classId);
  
  const [type, setType] = useState<'Assenza' | 'Ritardo' | 'Uscita Anticipata' | 'Presente'>(current?.type || 'Presente');
  const [time, setTime] = useState(current?.time || '08:00');

  const handleSave = () => {
    if (type === 'Presente') {
      setAttendance(attendance.filter((a: any) => !(a.studentId === studentId && a.classId === classId)));
    } else {
      const newEntry: Attendance = {
        id: Math.random().toString(),
        studentId,
        classId,
        date: new Date().toISOString(),
        type,
        time: (type === 'Ritardo' || type === 'Uscita Anticipata') ? time : undefined
      };
      setAttendance([...attendance.filter((a: any) => !(a.studentId === studentId && a.classId === classId)), newEntry]);
    }
    setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={`min-w-[44px] h-10 rounded-xl text-[11px] font-extrabold uppercase transition-all flex items-center justify-center border-2 ${
          !current ? 'bg-slate-50 text-slate-300 border-slate-100' : 
          current.type === 'Assenza' ? 'bg-red-50 text-brand-danger border-red-100' : 
          current.type === 'Ritardo' ? 'bg-orange-50 text-brand-secondary border-orange-100' : 
          'bg-blue-50 text-brand-primary border-blue-100'
        }`}
      >
        {current ? (current.type === 'Ritardo' ? `R ${current.time}` : current.type === 'Uscita Anticipata' ? `U ${current.time}` : 'A') : 'P'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Presenza Studente</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {(['Presente', 'Assenza', 'Ritardo', 'Uscita Anticipata'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setType(t)}
                    className={`p-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2 ${type === t ? 'bg-blue-50 text-brand-primary border-brand-primary/30' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {(type === 'Ritardo' || type === 'Uscita Anticipata') && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Orario</label>
                  <input 
                    type="time" 
                    className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:border-brand-primary"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>Annulla</Button>
                <Button variant="primary" className="flex-1" onClick={handleSave}>Salva</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function StudentProfile({ student, grades, notes, onClose }: { student: Student, grades: Grade[], notes: Note[], onClose: () => void }) {
  const parseGrade = (val: string): number => {
    let base = parseFloat(val);
    if (val.includes('+')) base += 0.25;
    if (val.includes('-')) base -= 0.25;
    if (val.includes('½')) base += 0.5;
    return base;
  };

  const average = grades.length > 0 
    ? (grades.reduce((acc, g) => acc + parseGrade(g.value), 0) / grades.length).toFixed(2)
    : 'N/A';

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[110]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-8 bg-brand-primary text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-xl transition-colors">
            <X size={24} />
          </button>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-3xl font-black">
              {student.surname[0]}{student.name[0]}
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">{student.surname} {student.name}</h3>
              <p className="text-white/70 font-bold uppercase tracking-widest text-sm">Profilo Studente</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Media Voti</span>
              <span className={`text-4xl font-black ${parseFloat(average) >= 6 ? 'text-brand-primary' : 'text-brand-danger'}`}>
                {average}
              </span>
            </div>
            <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Note Totali</span>
              <span className="text-4xl font-black text-orange-600">
                {notes.length}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap size={16} /> Storico Valutazioni
            </h4>
            <div className="grid gap-3">
              {grades.length === 0 ? (
                <p className="text-slate-400 font-medium italic">Nessun voto registrato.</p>
              ) : (
                grades.map(g => (
                  <div key={g.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{g.subject}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{g.type} • {g.date}</span>
                    </div>
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${parseGrade(g.value) >= 6 ? 'bg-blue-100 text-brand-primary' : 'bg-red-100 text-brand-danger'}`}>
                      {g.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ClipboardList size={16} /> Note Disciplinari
            </h4>
            <div className="grid gap-3">
              {notes.length === 0 ? (
                <p className="text-slate-400 font-medium italic">Nessuna nota registrata.</p>
              ) : (
                notes.map(n => (
                  <div key={n.id} className={`p-4 rounded-2xl border ${n.type === 'Merito' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-orange-50 border-orange-100 text-orange-700'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/50 rounded-full">{n.type}</span>
                      <span className="text-[10px] font-bold opacity-60">{n.date}</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{n.description}</p>
                    <p className="text-[10px] font-bold opacity-40 mt-2 uppercase tracking-tighter">Docente: {n.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <Button variant="primary" className="w-full py-4" onClick={onClose}>Chiudi Profilo</Button>
        </div>
      </motion.div>
    </div>
  );
}

function NoteButton({ student, classId, notes, setNotes, author }: any) {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<'Merito' | 'Individuale'>('Individuale');
  const [desc, setDesc] = useState('');

  const studentNotes = notes.filter((n: any) => n.studentId === student.id && n.classId === classId);

  const addNote = () => {
    if (!desc) return;
    const newNote: Note = {
      id: Math.random().toString(),
      classId,
      studentId: student.id,
      type,
      description: desc,
      date: new Date().toLocaleDateString(),
      author
    };
    setNotes([...notes, newNote]);
    setDesc('');
    setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 ${
          studentNotes.length > 0 
            ? 'bg-orange-50 text-orange-600 border-orange-100' 
            : 'bg-slate-50 text-slate-300 border-slate-100 hover:border-orange-200'
        }`}
      >
        <ClipboardList size={18} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Nota per {student.surname}</h3>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                {(['Individuale', 'Merito'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-2 ${type === t ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descrizione</label>
                <textarea 
                  placeholder="Scrivi qui la nota..."
                  className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-medium text-slate-700 outline-none focus:border-orange-400 h-32 resize-none"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>Annulla</Button>
                <Button variant="primary" className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={addNote}>Salva Nota</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function GradeButton({ student, classId, grades, setGrades, subjects }: any) {
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState('6');
  const [modifier, setModifier] = useState(''); // '', '+', '-', '½'
  const [subj, setSubj] = useState(subjects[0] || 'Tecnologia');
  const [type, setType] = useState<'Scritto' | 'Orale' | 'Pratico'>('Orale');

  const studentGrades = grades.filter((g: any) => g.studentId === student.id && g.classId === classId);

  const addGrade = () => {
    const newGrade: Grade = {
      id: Math.random().toString(),
      studentId: student.id,
      classId,
      subject: subj,
      value: `${val}${modifier}`,
      date: new Date().toLocaleDateString(),
      type
    };
    setGrades([...grades, newGrade]);
    setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all border-2 relative ${
          studentGrades.length > 0 
            ? 'bg-blue-50 text-brand-primary border-brand-primary/20' 
            : 'bg-slate-50 text-slate-300 border-slate-100 hover:border-brand-primary/30'
        }`}
      >
        {studentGrades.length > 0 ? studentGrades[studentGrades.length - 1].value : <Plus size={20} />}
        {studentGrades.length > 1 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-primary text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
            {studentGrades.length}
          </span>
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Voto per {student.surname}</h3>
                <p className="text-sm text-slate-500 font-medium">Inserimento valutazione</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Valutazione</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {[4, 5, 6, 7, 8, 9, 10].map(v => (
                    <button 
                      key={v}
                      onClick={() => setVal(v.toString())}
                      className={`min-w-[48px] h-12 rounded-xl font-black text-lg transition-all ${val === v.toString() ? 'bg-brand-primary text-white shadow-md scale-110' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {['', '+', '-', '½'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setModifier(m)}
                      className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all border-2 ${modifier === m ? 'bg-brand-secondary text-white border-brand-secondary' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
                    >
                      {m === '' ? 'Intero' : m}
                    </button>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <span className="text-3xl font-black text-brand-primary">{val}{modifier}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Materia</label>
                <select 
                  className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 focus:border-brand-primary outline-none"
                  value={subj}
                  onChange={(e) => setSubj(e.target.value)}
                >
                  {subjects.map((s: string) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tipologia Prova</label>
                <div className="flex gap-3">
                  {(['Scritto', 'Orale', 'Pratico'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-2 ${type === t ? 'bg-blue-50 text-brand-primary border-brand-primary/30' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>Annulla</Button>
                <Button variant="primary" className="flex-1" onClick={addGrade}>Conferma Voto</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function LessonForm({ onSave, subjects, author }: { onSave: (l: Omit<Lesson, 'classId'>) => void, subjects: string[], author: string }) {
  const [subject, setSubject] = useState(subjects[0] || 'Tecnologia');
  const [hour, setHour] = useState(1);
  const [topic, setTopic] = useState('');
  const [desc, setDesc] = useState('');

  const handleSave = () => {
    if (!topic) return;
    onSave({
      id: Math.random().toString(),
      date: new Date().toLocaleDateString(),
      hour,
      subject: subject as any,
      topic,
      description: desc,
      author
    });
    setTopic('');
    setDesc('');
  };

  return (
    <Card className="space-y-5 bg-blue-50/30 border-blue-100">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Materia</label>
          <select className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-brand-primary" value={subject} onChange={e => setSubject(e.target.value)}>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ora di Lezione</label>
          <select className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-brand-primary" value={hour} onChange={e => setHour(parseInt(e.target.value))}>
            {HOURS.map(h => <option key={h} value={h}>{h}° Ora</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Argomento Principale</label>
        <input 
          type="text" 
          placeholder="es. Introduzione ai materiali"
          className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-brand-primary"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dettagli Svolgimento</label>
        <textarea 
          placeholder="Dettagli della lezione..."
          className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-brand-primary h-28 resize-none"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <Button className="w-full py-4 shadow-md" onClick={handleSave}><Save size={20} /> Registra Lezione</Button>
    </Card>
  );
}

function HomeworkForm({ onSave, subjects, author }: { onSave: (h: Omit<Homework, 'classId'>) => void, subjects: string[], author: string }) {
  const [subject, setSubject] = useState(subjects[0] || 'Tecnologia');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    if (!desc || !date) return;
    onSave({
      id: Math.random().toString(),
      subject: subject as any,
      description: desc,
      dueDate: date,
      author
    });
    setDesc('');
    setDate('');
  };

  return (
    <Card className="space-y-5 bg-orange-50/30 border-orange-100">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Materia</label>
          <select className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-brand-secondary" value={subject} onChange={e => setSubject(e.target.value)}>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Consegna</label>
          <input type="date" className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-brand-secondary" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descrizione Compiti</label>
        <textarea 
          placeholder="Descrizione compiti..."
          className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-brand-secondary h-28 resize-none"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <Button variant="secondary" className="w-full py-4 shadow-md" onClick={handleSave}><Plus size={20} /> Assegna Compiti</Button>
    </Card>
  );
}

function ActivityForm({ onSave }: { onSave: (a: Omit<PlannedActivity, 'classId'>) => void }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    if (!title || !date) return;
    onSave({
      id: Math.random().toString(),
      title,
      description: desc,
      date
    });
    setTitle('');
    setDesc('');
    setDate('');
  };

  return (
    <Card className="space-y-5 bg-purple-50/30 border-purple-100">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Titolo Attività</label>
          <input 
            type="text" 
            placeholder="es. Verifica Scritta"
            className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-purple-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Evento</label>
          <input type="date" className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-purple-500" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Note Aggiuntive</label>
        <textarea 
          placeholder="Dettagli..."
          className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-purple-500 h-28 resize-none"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <Button variant="primary" className="w-full py-4 bg-purple-600 hover:bg-purple-700 shadow-md" onClick={handleSave}><Plus size={20} /> Aggiungi in Agenda</Button>
    </Card>
  );
}

function MeetingForm({ students, onSave }: { students: Student[], onSave: (m: Omit<Meeting, 'id' | 'author'>) => void }) {
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [parentName, setParentName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!studentId || !parentName || !notes) return;
    onSave({
      studentId,
      parentName,
      date,
      time,
      notes
    });
    setParentName('');
    setNotes('');
  };

  return (
    <Card className="space-y-5 bg-red-50/30 border-red-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Studente</label>
          <select 
            className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-red-400" 
            value={studentId} 
            onChange={e => setStudentId(e.target.value)}
          >
            {students.map(s => <option key={s.id} value={s.id}>{s.surname} {s.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome Genitore</label>
          <input 
            type="text" 
            placeholder="es. Rossi Mario"
            className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-red-400"
            value={parentName}
            onChange={e => setParentName(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data</label>
          <input type="date" className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-red-400" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ora</label>
          <input type="time" className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-red-400" value={time} onChange={e => setTime(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verbale del Colloquio</label>
        <textarea 
          placeholder="Dettagli dell'incontro..."
          className="w-full p-3.5 rounded-xl border-2 border-slate-100 bg-white font-medium text-slate-700 outline-none focus:border-red-400 h-28 resize-none"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <Button variant="primary" className="w-full py-4 bg-red-600 hover:bg-red-700 shadow-md" onClick={handleSave}><Plus size={20} /> Registra Colloquio</Button>
    </Card>
  );
}

function ScheduleEditor({ schedule, setSchedule, subjects }: { schedule: WeeklySchedule, setSchedule: (s: WeeklySchedule) => void, subjects: string[] }) {
  const [selectedDay, setSelectedDay] = useState(1);

  const updateHour = (hour: number, subject: string) => {
    const newSchedule = { ...schedule };
    if (!newSchedule[selectedDay]) newSchedule[selectedDay] = {};
    newSchedule[selectedDay][hour] = subject as any;
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {DAYS_OF_WEEK.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border-2 ${selectedDay === day.id ? 'bg-brand-primary text-white border-brand-primary shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
          >
            {day.name}
          </button>
        ))}
      </div>

      <Card padding="p-0">
        <div className="divide-y divide-slate-100">
          {HOURS.map(h => (
            <div key={h} className="p-5 flex items-center justify-between gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold">
                {h}°
              </div>
              <select
                className="flex-1 p-3 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:border-brand-primary"
                value={schedule[selectedDay]?.[h] || 'Nessuna'}
                onChange={(e) => updateHour(h, e.target.value)}
              >
                <option value="Nessuna">Nessuna Materia</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>

      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-start gap-4">
        <AlertCircle className="text-brand-primary shrink-0" size={20} />
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          Le modifiche apportate qui verranno visualizzate automaticamente nella dashboard del giorno corrispondente.
        </p>
      </div>
    </div>
  );
}

function SubjectManager({ subjects, setSubjects }: { subjects: string[], setSubjects: (s: string[]) => void }) {
  const [newSubj, setNewSubj] = useState('');

  const addSubject = () => {
    if (newSubj && !subjects.includes(newSubj)) {
      setSubjects([...subjects, newSubj]);
      setNewSubj('');
    }
  };

  const removeSubject = (subj: string) => {
    setSubjects(subjects.filter(s => s !== subj));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-50 border-slate-200">
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Nuova materia..."
            className="flex-1 p-4 rounded-xl border-2 border-slate-100 bg-white font-bold text-slate-700 outline-none focus:border-brand-primary"
            value={newSubj}
            onChange={e => setNewSubj(e.target.value)}
          />
          <Button onClick={addSubject}><Plus size={20} /> Aggiungi</Button>
        </div>
      </Card>

      <div className="grid gap-3">
        {subjects.map(s => (
          <Card key={s} padding="p-4" className="flex items-center justify-between">
            <span className="font-bold text-slate-700">{s}</span>
            <button 
              onClick={() => removeSubject(s)}
              className="p-2 text-slate-300 hover:text-brand-danger transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
