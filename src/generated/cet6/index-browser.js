
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.WordScalarFieldEnum = {
  id: 'id',
  text: 'text',
  rank: 'rank',
  freq: 'freq',
  ukPhone: 'ukPhone',
  usPhone: 'usPhone',
  trans: 'trans',
  defEn: 'defEn',
  phrases: 'phrases',
  sents: 'sents',
  exam: 'exam',
  synos: 'synos',
  relWords: 'relWords',
  mnemonic: 'mnemonic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WordProgressScalarFieldEnum = {
  id: 'id',
  wordId: 'wordId',
  stage: 'stage',
  ease: 'ease',
  dueAt: 'dueAt',
  reps: 'reps',
  lapses: 'lapses',
  lastResult: 'lastResult',
  recallLv: 'recallLv',
  spellLv: 'spellLv',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotebookItemScalarFieldEnum = {
  id: 'id',
  kind: 'kind',
  source: 'source',
  title: 'title',
  content: 'content',
  answer: 'answer',
  myAnswer: 'myAnswer',
  note: 'note',
  tags: 'tags',
  refId: 'refId',
  stage: 'stage',
  dueAt: 'dueAt',
  reps: 'reps',
  lapses: 'lapses',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudySessionScalarFieldEnum = {
  id: 'id',
  kind: 'kind',
  minutes: 'minutes',
  pomodoros: 'pomodoros',
  startedAt: 'startedAt',
  endedAt: 'endedAt',
  note: 'note',
  createdAt: 'createdAt'
};

exports.Prisma.DailyStatScalarFieldEnum = {
  date: 'date',
  minutes: 'minutes',
  newWords: 'newWords',
  reviews: 'reviews',
  correct: 'correct',
  wrong: 'wrong',
  pomodoros: 'pomodoros',
  streak: 'streak',
  updatedAt: 'updatedAt'
};

exports.Prisma.ListeningDrillScalarFieldEnum = {
  id: 'id',
  title: 'title',
  source: 'source',
  refId: 'refId',
  audioPath: 'audioPath',
  sentences: 'sentences',
  dictation: 'dictation',
  accuracy: 'accuracy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WritingTemplateScalarFieldEnum = {
  id: 'id',
  category: 'category',
  title: 'title',
  summary: 'summary',
  body: 'body',
  phrases: 'phrases',
  starred: 'starred',
  sort: 'sort'
};

exports.Prisma.PaperScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  year: 'year',
  month: 'month',
  set: 'set',
  label: 'label',
  writing: 'writing',
  writingModel: 'writingModel',
  writingModelZh: 'writingModelZh',
  translation: 'translation',
  translationReference: 'translationReference',
  subjective: 'subjective',
  passages: 'passages',
  questions: 'questions',
  byPart: 'byPart',
  questionCount: 'questionCount',
  audioUrl: 'audioUrl',
  audioHls: 'audioHls',
  audioPieces: 'audioPieces',
  listenedAt: 'listenedAt',
  source: 'source',
  createdAt: 'createdAt'
};

exports.Prisma.PaperAttemptScalarFieldEnum = {
  id: 'id',
  paperId: 'paperId',
  section: 'section',
  total: 'total',
  correct: 'correct',
  detail: 'detail',
  minutes: 'minutes',
  createdAt: 'createdAt'
};

exports.Prisma.DailyArticleScalarFieldEnum = {
  id: 'id',
  date: 'date',
  title: 'title',
  sourceUrl: 'sourceUrl',
  paragraphs: 'paragraphs',
  audioPath: 'audioPath',
  vocab: 'vocab',
  quiz: 'quiz',
  translation: 'translation',
  generatedBy: 'generatedBy',
  createdAt: 'createdAt'
};

exports.Prisma.ListeningItemScalarFieldEnum = {
  id: 'id',
  source: 'source',
  externalId: 'externalId',
  title: 'title',
  pageUrl: 'pageUrl',
  audioUrl: 'audioUrl',
  transcript: 'transcript',
  summary: 'summary',
  level: 'level',
  publishedAt: 'publishedAt',
  durationSec: 'durationSec',
  fetchedAt: 'fetchedAt',
  listenedAt: 'listenedAt'
};

exports.Prisma.SettingScalarFieldEnum = {
  key: 'key',
  value: 'value',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Word: 'Word',
  WordProgress: 'WordProgress',
  NotebookItem: 'NotebookItem',
  StudySession: 'StudySession',
  DailyStat: 'DailyStat',
  ListeningDrill: 'ListeningDrill',
  WritingTemplate: 'WritingTemplate',
  Paper: 'Paper',
  PaperAttempt: 'PaperAttempt',
  DailyArticle: 'DailyArticle',
  ListeningItem: 'ListeningItem',
  Setting: 'Setting'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
