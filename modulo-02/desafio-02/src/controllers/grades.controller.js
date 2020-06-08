const GradesRepository = require('../repositories/grades.repository');

const create = (req, res) => {
  const newGrade = GradesRepository.create(req.body);
  
  res.status(201).json(newGrade);
};

const update = (req, res) => {
  const updatedGrade = GradesRepository.update(parseInt(req.params.id), req.body);
  
  res.status(200).json(updatedGrade);
};

const remove = (req, res) => {
  const removedGrade = GradesRepository.remove(parseInt(req.params.id));
  
  res.status(200).json(removedGrade);
};

const find = (req, res) => {
  const grade = GradesRepository.findById(parseInt(req.params.id));
  
  res.status(200).json(grade);
};

const getStudentTotalBySubject = (req, res) => {
  const total = GradesRepository
    .findAll()
    .filter(filterByStudent(req.params.student))
    .filter(filterBySubject(req.params.subject))
    .reduce(sumGrades, 0);
  
  res.status(200).json({total});
};

const getAverageBySubjectAndType = (req, res) => {
  const grades = GradesRepository
    .findAll()
    .filter(filterBySubject(req.params.subject))
    .filter(filterByType(req.params.type));
  
  const avg = grades.reduce(sumGrades, 0) / grades.length;
  
  res.status(200).json({avg});
};

const getTopGradesBySubjectAndType = (req, res) => {
  const topGrades = GradesRepository
    .findAll()
    .filter(filterBySubject(req.params.subject))
    .filter(filterByType(req.params.type))
    .sort(sortGradesDesc)
    .slice(0, 3);
  
  res.status(200).json(topGrades);
};

const filterByStudent = (student) => (grade) => grade.student === student;
const filterBySubject = (subject) => (grade) => grade.subject === subject;
const filterByType = (type) => (grade) => grade.type === type;
const sumGrades = (sum, curr) => sum += curr.value;
const sortGradesDesc = (gradeA, gradeB) => gradeB.value - gradeA.value;

module.exports = {
  create,
  update,
  remove,
  find,
  getStudentTotalBySubject,
  getAverageBySubjectAndType,
  getTopGradesBySubjectAndType
};
