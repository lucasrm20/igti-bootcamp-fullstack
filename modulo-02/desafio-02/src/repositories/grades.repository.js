const fs    = require('fs');
const path  = require('path');

const NotFoundError = require('../util/not-found.error');

const filepath = path.resolve(__dirname, '../data/grades.json');

const loadData = () => {
  return JSON.parse(fs.readFileSync(filepath));
};

const getNextId = () => {
  return loadData().nextId;
};

const getGrades = () => {
  return loadData().grades;
};

const save = (newData) => {
  fs.writeFileSync(filepath, JSON.stringify(newData));
};

const create = (gradeData) => {
  const newGrade = {
    id: getNextId(),
    ...gradeData,
    timestamp: new Date()
  };

  const data = {
    nextId: getNextId() + 1,
    grades: [
      ...getGrades(),
      newGrade
    ]
  };

  save(data);

  return newGrade;
};

const update = (id, gradeData) => {
  const grades = getGrades();
  const index = grades.findIndex(g => g.id === id);

  if (index < 0) throw new NotFoundError(`Grade with id ${id} not found`);

  const updatedGrade = {
    ...grades[index],
    ...gradeData
  };

  grades[index] = updatedGrade;

  save({
    nextId: getNextId(),
    grades
  });

  return updatedGrade;
};

const remove = (id) => {
  const grades = getGrades();
  const index = grades.findIndex(g => g.id === id);

  if (index < 0) throw new NotFoundError(`Grade with id ${id} not found`);

  const removedGrade = grades[index];

  save({
    nextId: getNextId(),
    grades: grades.filter(g => g.id !== id)
  });

  return removedGrade;
};

const findById = (id) => {
  const grade = getGrades().find(g => g.id === id);

  if (!grade) throw new NotFoundError(`Grade with id ${id} not found`);

  return grade;
};

module.exports = {
  create,
  update,
  remove,
  findById,
  findAll: getGrades
};
