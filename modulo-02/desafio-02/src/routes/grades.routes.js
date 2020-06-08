const { Router }        = require('express');
const GradesController  = require('../controllers/grades.controller');

const idValidator     = require('../validators/id.validator');
const gradesValidator = require('../validators/grades.validator');

const router = Router();

router.post('/', [
  gradesValidator,
  GradesController.create
]);

router.get('/:id', [
  idValidator,
  GradesController.find
]);

router.put('/:id', [
  idValidator,
  gradesValidator,
  GradesController.update
]);

router.delete('/:id', [
  idValidator,
  GradesController.remove
]);

router.get('/:student/:subject/total', GradesController.getStudentTotalBySubject);
router.get('/:subject/:type/avg', GradesController.getAverageBySubjectAndType);
router.get('/:subject/:type/top', GradesController.getTopGradesBySubjectAndType);

module.exports = router;
