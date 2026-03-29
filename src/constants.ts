import { Subject, Student, WeeklySchedule, SchoolClass } from './types';

export const SUBJECTS: Subject[] = [
  'Letteratura',
  'Grammatica',
  'Antologia',
  'Geografia',
  'Storia',
  'Algebra',
  'Geometria',
  'Inglese',
  'Tecnologia',
  'Scienze',
  'Religione',
  'Educazione Civica',
  'Musica',
  'Arte',
  'Lettura Espressiva',
  'Spagnolo',
  'Motoria'
];

export const HOURS = [1, 2, 3, 4, 5, 6];

export const DAYS_OF_WEEK = [
  { id: 1, name: 'Lunedì' },
  { id: 2, name: 'Martedì' },
  { id: 3, name: 'Mercoledì' },
  { id: 4, name: 'Giovedì' },
  { id: 5, name: 'Venerdì' }
];

export const DEFAULT_WEEKLY_SCHEDULE: WeeklySchedule = {
  1: { 1: 'Letteratura', 2: 'Grammatica', 3: 'Antologia', 4: 'Geografia', 5: 'Storia', 6: 'Inglese' },
  2: { 1: 'Algebra', 2: 'Geometria', 3: 'Tecnologia', 4: 'Letteratura', 5: 'Grammatica', 6: 'Antologia' },
  3: { 1: 'Geografia', 2: 'Storia', 3: 'Inglese', 4: 'Algebra', 5: 'Geometria', 6: 'Tecnologia' },
  4: { 1: 'Letteratura', 2: 'Grammatica', 3: 'Antologia', 4: 'Geografia', 5: 'Storia', 6: 'Inglese' },
  5: { 1: 'Algebra', 2: 'Geometria', 3: 'Tecnologia', 4: 'Letteratura', 5: 'Grammatica', 6: 'Antologia' },
};

export const MOCK_CLASSES: SchoolClass[] = [
  {
    id: '3A',
    name: '3A',
    subjects: [...SUBJECTS],
    schedule: { ...DEFAULT_WEEKLY_SCHEDULE },
    students: [
      { id: '1', name: 'Alessandro', surname: 'Rossi' },
      { id: '2', name: 'Sofia', surname: 'Bianchi' },
      { id: '3', name: 'Lorenzo', surname: 'Verdi' },
      { id: '4', name: 'Giulia', surname: 'Ricci' },
      { id: '5', name: 'Mattia', surname: 'Marini' },
      { id: '6', name: 'Alice', surname: 'Galli' },
      { id: '7', name: 'Leonardo', surname: 'Conti' },
      { id: '8', name: 'Emma', surname: 'Ferrari' },
      { id: '9', name: 'Gabriele', surname: 'Russo' },
      { id: '10', name: 'Chiara', surname: 'Moretti' },
      { id: '11', name: 'Riccardo', surname: 'Barbieri' },
      { id: '12', name: 'Beatrice', surname: 'Fontana' },
      { id: '13', name: 'Tommaso', surname: 'Santoro' },
      { id: '14', name: 'Aurora', surname: 'Mariani' },
      { id: '15', name: 'Edoardo', surname: 'Rinaldi' },
      { id: '16', name: 'Martina', surname: 'Caruso' },
      { id: '17', name: 'Federico', surname: 'Ferrara' },
      { id: '18', name: 'Ginevra', surname: 'Gallo' },
      { id: '19', name: 'Pietro', surname: 'Costa' },
      { id: '20', name: 'Greta', surname: 'Mancini' },
      { id: '21', name: 'Filippo', surname: 'Leone' }
    ]
  },
  {
    id: '2B',
    name: '2B',
    subjects: [...SUBJECTS],
    schedule: { ...DEFAULT_WEEKLY_SCHEDULE },
    students: [
      { id: '101', name: 'Marco', surname: 'Esposito' },
      { id: '102', name: 'Elena', surname: 'Romano' },
      { id: '103', name: 'Davide', surname: 'Colombo' },
      { id: '104', name: 'Sara', surname: 'Ricci' },
      { id: '105', name: 'Luca', surname: 'Marino' },
      { id: '106', name: 'Anna', surname: 'Greco' },
      { id: '107', name: 'Fabio', surname: 'Bruno' },
      { id: '108', name: 'Elisa', surname: 'Gallo' },
      { id: '109', name: 'Giacomo', surname: 'Conti' },
      { id: '110', name: 'Marta', surname: 'De Luca' },
      { id: '111', name: 'Simone', surname: 'Costa' },
      { id: '112', name: 'Laura', surname: 'Giordano' },
      { id: '113', name: 'Andrea', surname: 'Mancini' },
      { id: '114', name: 'Paola', surname: 'Russo' },
      { id: '115', name: 'Daniele', surname: 'Ferrari' },
      { id: '116', name: 'Silvia', surname: 'Bianchi' },
      { id: '117', name: 'Roberto', surname: 'Rossi' },
      { id: '118', name: 'Cristina', surname: 'Moretti' },
      { id: '119', name: 'Antonio', surname: 'Barbieri' },
      { id: '120', name: 'Valentina', surname: 'Fontana' }
    ]
  },
  {
    id: '1C',
    name: '1C',
    subjects: [...SUBJECTS],
    schedule: { ...DEFAULT_WEEKLY_SCHEDULE },
    students: [
      { id: '201', name: 'Giovanni', surname: 'Basile' },
      { id: '202', name: 'Francesca', surname: 'D’Amico' },
      { id: '203', name: 'Claudio', surname: 'Serra' },
      { id: '204', name: 'Ilaria', surname: 'Piras' },
      { id: '205', name: 'Enrico', surname: 'Vitali' },
      { id: '206', name: 'Luisa', surname: 'Longo' },
      { id: '207', name: 'Giorgio', surname: 'Fabbri' },
      { id: '208', name: 'Elena', surname: 'Guerra' },
      { id: '209', name: 'Matteo', surname: 'Sanna' },
      { id: '210', name: 'Rosa', surname: 'Villa' },
      { id: '211', name: 'Stefano', surname: 'Mazza' },
      { id: '212', name: 'Carla', surname: 'Pellegrini' },
      { id: '213', name: 'Paolo', surname: 'Palumbo' },
      { id: '214', name: 'Lucia', surname: 'Sartori' },
      { id: '215', name: 'Massimo', surname: 'Morelli' },
      { id: '216', name: 'Daniela', surname: 'Testa' },
      { id: '217', name: 'Valerio', surname: 'Marchetti' },
      { id: '218', name: 'Serena', surname: 'Riva' },
      { id: '219', name: 'Angelo', surname: 'Donati' },
      { id: '220', name: 'Monica', surname: 'Farina' }
    ]
  },
  {
    id: '3D',
    name: '3D',
    subjects: [...SUBJECTS],
    schedule: { ...DEFAULT_WEEKLY_SCHEDULE },
    students: [
      { id: '301', name: 'Vittoria', surname: 'Rizzo' },
      { id: '302', name: 'Domenico', surname: 'Lombardi' },
      { id: '303', name: 'Rachele', surname: 'Pellegrino' },
      { id: '304', name: 'Samuele', surname: 'Serra' },
      { id: '305', name: 'Noemi', surname: 'Carbone' },
      { id: '306', name: 'Manuel', surname: 'D’Angelo' },
      { id: '307', name: 'Gaia', surname: 'Ferri' },
      { id: '308', name: 'Christian', surname: 'Orlando' },
      { id: '309', name: 'Sara', surname: 'Marchetti' },
      { id: '310', name: 'Davide', surname: 'Gatti' },
      { id: '311', name: 'Giulia', surname: 'Mazzeo' },
      { id: '312', name: 'Matteo', surname: 'Rinaldi' },
      { id: '313', name: 'Sofia', surname: 'Piras' },
      { id: '314', name: 'Andrea', surname: 'Vitali' },
      { id: '315', name: 'Elena', surname: 'Longo' },
      { id: '316', name: 'Luca', surname: 'Fabbri' },
      { id: '317', name: 'Anna', surname: 'Guerra' },
      { id: '318', name: 'Fabio', surname: 'Sanna' },
      { id: '319', name: 'Marta', surname: 'Villa' },
      { id: '320', name: 'Simone', surname: 'Mazza' }
    ]
  },
  {
    id: '2C',
    name: '2C',
    subjects: [...SUBJECTS],
    schedule: { ...DEFAULT_WEEKLY_SCHEDULE },
    students: [
      { id: '401', name: 'Pietro', surname: 'Neri' },
      { id: '402', name: 'Chiara', surname: 'Grassi' },
      { id: '403', name: 'Stefano', surname: 'Pellegrini' },
      { id: '404', name: 'Lucia', surname: 'Palumbo' },
      { id: '405', name: 'Massimo', surname: 'Sartori' },
      { id: '406', name: 'Daniela', surname: 'Morelli' },
      { id: '407', name: 'Valerio', surname: 'Testa' },
      { id: '408', name: 'Serena', surname: 'Marchetti' },
      { id: '409', name: 'Angelo', surname: 'Riva' },
      { id: '410', name: 'Monica', surname: 'Donati' },
      { id: '411', name: 'Giovanni', surname: 'Farina' },
      { id: '412', name: 'Francesca', surname: 'Basile' },
      { id: '413', name: 'Claudio', surname: 'D’Amico' },
      { id: '414', name: 'Ilaria', surname: 'Serra' },
      { id: '415', name: 'Enrico', surname: 'Piras' },
      { id: '416', name: 'Luisa', surname: 'Vitali' },
      { id: '417', name: 'Giorgio', surname: 'Longo' },
      { id: '418', name: 'Elena', surname: 'Fabbri' },
      { id: '419', name: 'Matteo', surname: 'Guerra' },
      { id: '420', name: 'Rosa', surname: 'Sanna' }
    ]
  },
  {
    id: '1A',
    name: '1A',
    subjects: [...SUBJECTS],
    schedule: { ...DEFAULT_WEEKLY_SCHEDULE },
    students: [
      { id: '501', name: 'Emanuele', surname: 'Festa' },
      { id: '502', name: 'Silvia', surname: 'Gallo' },
      { id: '503', name: 'Roberto', surname: 'Conti' },
      { id: '504', name: 'Cristina', surname: 'De Luca' },
      { id: '505', name: 'Antonio', surname: 'Costa' },
      { id: '506', name: 'Valentina', surname: 'Giordano' },
      { id: '507', name: 'Marco', surname: 'Mancini' },
      { id: '508', name: 'Elena', surname: 'Russo' },
      { id: '509', name: 'Davide', surname: 'Ferrari' },
      { id: '510', name: 'Sara', surname: 'Bianchi' },
      { id: '511', name: 'Luca', surname: 'Rossi' },
      { id: '512', name: 'Anna', surname: 'Moretti' },
      { id: '513', name: 'Fabio', surname: 'Barbieri' },
      { id: '514', name: 'Elisa', surname: 'Fontana' },
      { id: '515', name: 'Giacomo', surname: 'Santoro' },
      { id: '516', name: 'Marta', surname: 'Mariani' },
      { id: '517', name: 'Simone', surname: 'Rinaldi' },
      { id: '518', name: 'Laura', surname: 'Caruso' },
      { id: '519', name: 'Andrea', surname: 'Ferrara' },
      { id: '520', name: 'Paola', surname: 'Gallo' }
    ]
  }
];
