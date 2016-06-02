import { packageSegment } from './packageSegment';
import { importSegment } from './importSegment';
import { classSegment } from './classSegment';
import { constructorSegment } from './constructorSegment';
import { methodSegment } from './methodSegment';
import { annotationSegment } from './annotationSegment';
import { enumSegment } from './enumSegment';
import { stringLiteralSegment } from './stringLiteralSegment';
import { arrayLiteralSegment } from './arrayLiteralSegment';
import { genericTypeSegment } from './genericTypeSegment';
import { interfaceSegment } from './interfaceSegment';
import { fileSegment } from './fileSegment';
import { applyMiddleware } from './applyMiddleware';

const javaSegments = {
  packageSegment,
  importSegment,
  classSegment,
  constructorSegment,
  methodSegment,
  annotationSegment,
  enumSegment,
  interfaceSegment,
  stringLiteralSegment,
  arrayLiteralSegment,
  genericTypeSegment,
  fileSegment
};

module.exports = Object.assign({}, javaSegments, {
  applyMiddleware: applyMiddleware.bind(undefined, javaSegments)
});
