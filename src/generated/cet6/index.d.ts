
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Word
 * 
 */
export type Word = $Result.DefaultSelection<Prisma.$WordPayload>
/**
 * Model WordProgress
 * 复习排程（简化版 SM-2 / 艾宾浩斯）
 */
export type WordProgress = $Result.DefaultSelection<Prisma.$WordProgressPayload>
/**
 * Model NotebookItem
 * 
 */
export type NotebookItem = $Result.DefaultSelection<Prisma.$NotebookItemPayload>
/**
 * Model StudySession
 * 
 */
export type StudySession = $Result.DefaultSelection<Prisma.$StudySessionPayload>
/**
 * Model DailyStat
 * 
 */
export type DailyStat = $Result.DefaultSelection<Prisma.$DailyStatPayload>
/**
 * Model ListeningDrill
 * 
 */
export type ListeningDrill = $Result.DefaultSelection<Prisma.$ListeningDrillPayload>
/**
 * Model WritingTemplate
 * 
 */
export type WritingTemplate = $Result.DefaultSelection<Prisma.$WritingTemplatePayload>
/**
 * Model Paper
 * 
 */
export type Paper = $Result.DefaultSelection<Prisma.$PaperPayload>
/**
 * Model PaperAttempt
 * 真题练习记录（含错题）
 */
export type PaperAttempt = $Result.DefaultSelection<Prisma.$PaperAttemptPayload>
/**
 * Model DailyArticle
 * 
 */
export type DailyArticle = $Result.DefaultSelection<Prisma.$DailyArticlePayload>
/**
 * Model ListeningItem
 * 每日听力：来自 BBC 6 Minute English / VOA Learning English 这类
 * 「真人朗读 + 有原文」的节目。和 2020–2026 真题听力互补 ——
 * 真题听力有音频没原文，这里两者都有，适合逐句精听跟读。
 * 抓取需要梯子（这些站在墙外），所以设计上允许为空：抓不到就不显示，不影响其他模块。
 */
export type ListeningItem = $Result.DefaultSelection<Prisma.$ListeningItemPayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Words
 * const words = await prisma.word.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Words
   * const words = await prisma.word.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.word`: Exposes CRUD operations for the **Word** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Words
    * const words = await prisma.word.findMany()
    * ```
    */
  get word(): Prisma.WordDelegate<ExtArgs>;

  /**
   * `prisma.wordProgress`: Exposes CRUD operations for the **WordProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WordProgresses
    * const wordProgresses = await prisma.wordProgress.findMany()
    * ```
    */
  get wordProgress(): Prisma.WordProgressDelegate<ExtArgs>;

  /**
   * `prisma.notebookItem`: Exposes CRUD operations for the **NotebookItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotebookItems
    * const notebookItems = await prisma.notebookItem.findMany()
    * ```
    */
  get notebookItem(): Prisma.NotebookItemDelegate<ExtArgs>;

  /**
   * `prisma.studySession`: Exposes CRUD operations for the **StudySession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudySessions
    * const studySessions = await prisma.studySession.findMany()
    * ```
    */
  get studySession(): Prisma.StudySessionDelegate<ExtArgs>;

  /**
   * `prisma.dailyStat`: Exposes CRUD operations for the **DailyStat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyStats
    * const dailyStats = await prisma.dailyStat.findMany()
    * ```
    */
  get dailyStat(): Prisma.DailyStatDelegate<ExtArgs>;

  /**
   * `prisma.listeningDrill`: Exposes CRUD operations for the **ListeningDrill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListeningDrills
    * const listeningDrills = await prisma.listeningDrill.findMany()
    * ```
    */
  get listeningDrill(): Prisma.ListeningDrillDelegate<ExtArgs>;

  /**
   * `prisma.writingTemplate`: Exposes CRUD operations for the **WritingTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WritingTemplates
    * const writingTemplates = await prisma.writingTemplate.findMany()
    * ```
    */
  get writingTemplate(): Prisma.WritingTemplateDelegate<ExtArgs>;

  /**
   * `prisma.paper`: Exposes CRUD operations for the **Paper** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Papers
    * const papers = await prisma.paper.findMany()
    * ```
    */
  get paper(): Prisma.PaperDelegate<ExtArgs>;

  /**
   * `prisma.paperAttempt`: Exposes CRUD operations for the **PaperAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaperAttempts
    * const paperAttempts = await prisma.paperAttempt.findMany()
    * ```
    */
  get paperAttempt(): Prisma.PaperAttemptDelegate<ExtArgs>;

  /**
   * `prisma.dailyArticle`: Exposes CRUD operations for the **DailyArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyArticles
    * const dailyArticles = await prisma.dailyArticle.findMany()
    * ```
    */
  get dailyArticle(): Prisma.DailyArticleDelegate<ExtArgs>;

  /**
   * `prisma.listeningItem`: Exposes CRUD operations for the **ListeningItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListeningItems
    * const listeningItems = await prisma.listeningItem.findMany()
    * ```
    */
  get listeningItem(): Prisma.ListeningItemDelegate<ExtArgs>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "word" | "wordProgress" | "notebookItem" | "studySession" | "dailyStat" | "listeningDrill" | "writingTemplate" | "paper" | "paperAttempt" | "dailyArticle" | "listeningItem" | "setting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Word: {
        payload: Prisma.$WordPayload<ExtArgs>
        fields: Prisma.WordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          findFirst: {
            args: Prisma.WordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          findMany: {
            args: Prisma.WordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          create: {
            args: Prisma.WordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          createMany: {
            args: Prisma.WordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          delete: {
            args: Prisma.WordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          update: {
            args: Prisma.WordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          deleteMany: {
            args: Prisma.WordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          aggregate: {
            args: Prisma.WordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWord>
          }
          groupBy: {
            args: Prisma.WordGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordCountArgs<ExtArgs>
            result: $Utils.Optional<WordCountAggregateOutputType> | number
          }
        }
      }
      WordProgress: {
        payload: Prisma.$WordProgressPayload<ExtArgs>
        fields: Prisma.WordProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>
          }
          findFirst: {
            args: Prisma.WordProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>
          }
          findMany: {
            args: Prisma.WordProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>[]
          }
          create: {
            args: Prisma.WordProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>
          }
          createMany: {
            args: Prisma.WordProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>[]
          }
          delete: {
            args: Prisma.WordProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>
          }
          update: {
            args: Prisma.WordProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>
          }
          deleteMany: {
            args: Prisma.WordProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WordProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordProgressPayload>
          }
          aggregate: {
            args: Prisma.WordProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWordProgress>
          }
          groupBy: {
            args: Prisma.WordProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordProgressCountArgs<ExtArgs>
            result: $Utils.Optional<WordProgressCountAggregateOutputType> | number
          }
        }
      }
      NotebookItem: {
        payload: Prisma.$NotebookItemPayload<ExtArgs>
        fields: Prisma.NotebookItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotebookItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotebookItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>
          }
          findFirst: {
            args: Prisma.NotebookItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotebookItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>
          }
          findMany: {
            args: Prisma.NotebookItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>[]
          }
          create: {
            args: Prisma.NotebookItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>
          }
          createMany: {
            args: Prisma.NotebookItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotebookItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>[]
          }
          delete: {
            args: Prisma.NotebookItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>
          }
          update: {
            args: Prisma.NotebookItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>
          }
          deleteMany: {
            args: Prisma.NotebookItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotebookItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotebookItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotebookItemPayload>
          }
          aggregate: {
            args: Prisma.NotebookItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotebookItem>
          }
          groupBy: {
            args: Prisma.NotebookItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotebookItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotebookItemCountArgs<ExtArgs>
            result: $Utils.Optional<NotebookItemCountAggregateOutputType> | number
          }
        }
      }
      StudySession: {
        payload: Prisma.$StudySessionPayload<ExtArgs>
        fields: Prisma.StudySessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudySessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudySessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>
          }
          findFirst: {
            args: Prisma.StudySessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudySessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>
          }
          findMany: {
            args: Prisma.StudySessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>[]
          }
          create: {
            args: Prisma.StudySessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>
          }
          createMany: {
            args: Prisma.StudySessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudySessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>[]
          }
          delete: {
            args: Prisma.StudySessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>
          }
          update: {
            args: Prisma.StudySessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>
          }
          deleteMany: {
            args: Prisma.StudySessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudySessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudySessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudySessionPayload>
          }
          aggregate: {
            args: Prisma.StudySessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudySession>
          }
          groupBy: {
            args: Prisma.StudySessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudySessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudySessionCountArgs<ExtArgs>
            result: $Utils.Optional<StudySessionCountAggregateOutputType> | number
          }
        }
      }
      DailyStat: {
        payload: Prisma.$DailyStatPayload<ExtArgs>
        fields: Prisma.DailyStatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyStatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyStatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>
          }
          findFirst: {
            args: Prisma.DailyStatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyStatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>
          }
          findMany: {
            args: Prisma.DailyStatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>[]
          }
          create: {
            args: Prisma.DailyStatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>
          }
          createMany: {
            args: Prisma.DailyStatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyStatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>[]
          }
          delete: {
            args: Prisma.DailyStatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>
          }
          update: {
            args: Prisma.DailyStatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>
          }
          deleteMany: {
            args: Prisma.DailyStatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyStatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyStatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatPayload>
          }
          aggregate: {
            args: Prisma.DailyStatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyStat>
          }
          groupBy: {
            args: Prisma.DailyStatGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyStatGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyStatCountArgs<ExtArgs>
            result: $Utils.Optional<DailyStatCountAggregateOutputType> | number
          }
        }
      }
      ListeningDrill: {
        payload: Prisma.$ListeningDrillPayload<ExtArgs>
        fields: Prisma.ListeningDrillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListeningDrillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListeningDrillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>
          }
          findFirst: {
            args: Prisma.ListeningDrillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListeningDrillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>
          }
          findMany: {
            args: Prisma.ListeningDrillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>[]
          }
          create: {
            args: Prisma.ListeningDrillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>
          }
          createMany: {
            args: Prisma.ListeningDrillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListeningDrillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>[]
          }
          delete: {
            args: Prisma.ListeningDrillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>
          }
          update: {
            args: Prisma.ListeningDrillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>
          }
          deleteMany: {
            args: Prisma.ListeningDrillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListeningDrillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListeningDrillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningDrillPayload>
          }
          aggregate: {
            args: Prisma.ListeningDrillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListeningDrill>
          }
          groupBy: {
            args: Prisma.ListeningDrillGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListeningDrillGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListeningDrillCountArgs<ExtArgs>
            result: $Utils.Optional<ListeningDrillCountAggregateOutputType> | number
          }
        }
      }
      WritingTemplate: {
        payload: Prisma.$WritingTemplatePayload<ExtArgs>
        fields: Prisma.WritingTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WritingTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WritingTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>
          }
          findFirst: {
            args: Prisma.WritingTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WritingTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>
          }
          findMany: {
            args: Prisma.WritingTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>[]
          }
          create: {
            args: Prisma.WritingTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>
          }
          createMany: {
            args: Prisma.WritingTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WritingTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>[]
          }
          delete: {
            args: Prisma.WritingTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>
          }
          update: {
            args: Prisma.WritingTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>
          }
          deleteMany: {
            args: Prisma.WritingTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WritingTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WritingTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WritingTemplatePayload>
          }
          aggregate: {
            args: Prisma.WritingTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWritingTemplate>
          }
          groupBy: {
            args: Prisma.WritingTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<WritingTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.WritingTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<WritingTemplateCountAggregateOutputType> | number
          }
        }
      }
      Paper: {
        payload: Prisma.$PaperPayload<ExtArgs>
        fields: Prisma.PaperFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaperFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaperFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          findFirst: {
            args: Prisma.PaperFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaperFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          findMany: {
            args: Prisma.PaperFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>[]
          }
          create: {
            args: Prisma.PaperCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          createMany: {
            args: Prisma.PaperCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaperCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>[]
          }
          delete: {
            args: Prisma.PaperDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          update: {
            args: Prisma.PaperUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          deleteMany: {
            args: Prisma.PaperDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaperUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaperUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          aggregate: {
            args: Prisma.PaperAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaper>
          }
          groupBy: {
            args: Prisma.PaperGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaperGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaperCountArgs<ExtArgs>
            result: $Utils.Optional<PaperCountAggregateOutputType> | number
          }
        }
      }
      PaperAttempt: {
        payload: Prisma.$PaperAttemptPayload<ExtArgs>
        fields: Prisma.PaperAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaperAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaperAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>
          }
          findFirst: {
            args: Prisma.PaperAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaperAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>
          }
          findMany: {
            args: Prisma.PaperAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>[]
          }
          create: {
            args: Prisma.PaperAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>
          }
          createMany: {
            args: Prisma.PaperAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaperAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>[]
          }
          delete: {
            args: Prisma.PaperAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>
          }
          update: {
            args: Prisma.PaperAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>
          }
          deleteMany: {
            args: Prisma.PaperAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaperAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaperAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperAttemptPayload>
          }
          aggregate: {
            args: Prisma.PaperAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaperAttempt>
          }
          groupBy: {
            args: Prisma.PaperAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaperAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaperAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<PaperAttemptCountAggregateOutputType> | number
          }
        }
      }
      DailyArticle: {
        payload: Prisma.$DailyArticlePayload<ExtArgs>
        fields: Prisma.DailyArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>
          }
          findFirst: {
            args: Prisma.DailyArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>
          }
          findMany: {
            args: Prisma.DailyArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>[]
          }
          create: {
            args: Prisma.DailyArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>
          }
          createMany: {
            args: Prisma.DailyArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>[]
          }
          delete: {
            args: Prisma.DailyArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>
          }
          update: {
            args: Prisma.DailyArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>
          }
          deleteMany: {
            args: Prisma.DailyArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyArticlePayload>
          }
          aggregate: {
            args: Prisma.DailyArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyArticle>
          }
          groupBy: {
            args: Prisma.DailyArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyArticleCountArgs<ExtArgs>
            result: $Utils.Optional<DailyArticleCountAggregateOutputType> | number
          }
        }
      }
      ListeningItem: {
        payload: Prisma.$ListeningItemPayload<ExtArgs>
        fields: Prisma.ListeningItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListeningItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListeningItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>
          }
          findFirst: {
            args: Prisma.ListeningItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListeningItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>
          }
          findMany: {
            args: Prisma.ListeningItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>[]
          }
          create: {
            args: Prisma.ListeningItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>
          }
          createMany: {
            args: Prisma.ListeningItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListeningItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>[]
          }
          delete: {
            args: Prisma.ListeningItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>
          }
          update: {
            args: Prisma.ListeningItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>
          }
          deleteMany: {
            args: Prisma.ListeningItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListeningItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListeningItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListeningItemPayload>
          }
          aggregate: {
            args: Prisma.ListeningItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListeningItem>
          }
          groupBy: {
            args: Prisma.ListeningItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListeningItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListeningItemCountArgs<ExtArgs>
            result: $Utils.Optional<ListeningItemCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PaperCountOutputType
   */

  export type PaperCountOutputType = {
    attempts: number
  }

  export type PaperCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | PaperCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * PaperCountOutputType without action
   */
  export type PaperCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperCountOutputType
     */
    select?: PaperCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaperCountOutputType without action
   */
  export type PaperCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaperAttemptWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Word
   */

  export type AggregateWord = {
    _count: WordCountAggregateOutputType | null
    _avg: WordAvgAggregateOutputType | null
    _sum: WordSumAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  export type WordAvgAggregateOutputType = {
    rank: number | null
    freq: number | null
  }

  export type WordSumAggregateOutputType = {
    rank: number | null
    freq: number | null
  }

  export type WordMinAggregateOutputType = {
    id: string | null
    text: string | null
    rank: number | null
    freq: number | null
    ukPhone: string | null
    usPhone: string | null
    trans: string | null
    defEn: string | null
    phrases: string | null
    sents: string | null
    exam: string | null
    synos: string | null
    relWords: string | null
    mnemonic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordMaxAggregateOutputType = {
    id: string | null
    text: string | null
    rank: number | null
    freq: number | null
    ukPhone: string | null
    usPhone: string | null
    trans: string | null
    defEn: string | null
    phrases: string | null
    sents: string | null
    exam: string | null
    synos: string | null
    relWords: string | null
    mnemonic: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordCountAggregateOutputType = {
    id: number
    text: number
    rank: number
    freq: number
    ukPhone: number
    usPhone: number
    trans: number
    defEn: number
    phrases: number
    sents: number
    exam: number
    synos: number
    relWords: number
    mnemonic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WordAvgAggregateInputType = {
    rank?: true
    freq?: true
  }

  export type WordSumAggregateInputType = {
    rank?: true
    freq?: true
  }

  export type WordMinAggregateInputType = {
    id?: true
    text?: true
    rank?: true
    freq?: true
    ukPhone?: true
    usPhone?: true
    trans?: true
    defEn?: true
    phrases?: true
    sents?: true
    exam?: true
    synos?: true
    relWords?: true
    mnemonic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordMaxAggregateInputType = {
    id?: true
    text?: true
    rank?: true
    freq?: true
    ukPhone?: true
    usPhone?: true
    trans?: true
    defEn?: true
    phrases?: true
    sents?: true
    exam?: true
    synos?: true
    relWords?: true
    mnemonic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordCountAggregateInputType = {
    id?: true
    text?: true
    rank?: true
    freq?: true
    ukPhone?: true
    usPhone?: true
    trans?: true
    defEn?: true
    phrases?: true
    sents?: true
    exam?: true
    synos?: true
    relWords?: true
    mnemonic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Word to aggregate.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Words
    **/
    _count?: true | WordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordMaxAggregateInputType
  }

  export type GetWordAggregateType<T extends WordAggregateArgs> = {
        [P in keyof T & keyof AggregateWord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWord[P]>
      : GetScalarType<T[P], AggregateWord[P]>
  }




  export type WordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordWhereInput
    orderBy?: WordOrderByWithAggregationInput | WordOrderByWithAggregationInput[]
    by: WordScalarFieldEnum[] | WordScalarFieldEnum
    having?: WordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordCountAggregateInputType | true
    _avg?: WordAvgAggregateInputType
    _sum?: WordSumAggregateInputType
    _min?: WordMinAggregateInputType
    _max?: WordMaxAggregateInputType
  }

  export type WordGroupByOutputType = {
    id: string
    text: string
    rank: number
    freq: number
    ukPhone: string | null
    usPhone: string | null
    trans: string
    defEn: string | null
    phrases: string
    sents: string
    exam: string
    synos: string
    relWords: string
    mnemonic: string | null
    createdAt: Date
    updatedAt: Date
    _count: WordCountAggregateOutputType | null
    _avg: WordAvgAggregateOutputType | null
    _sum: WordSumAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  type GetWordGroupByPayload<T extends WordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordGroupByOutputType[P]>
            : GetScalarType<T[P], WordGroupByOutputType[P]>
        }
      >
    >


  export type WordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    rank?: boolean
    freq?: boolean
    ukPhone?: boolean
    usPhone?: boolean
    trans?: boolean
    defEn?: boolean
    phrases?: boolean
    sents?: boolean
    exam?: boolean
    synos?: boolean
    relWords?: boolean
    mnemonic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    progress?: boolean | Word$progressArgs<ExtArgs>
  }, ExtArgs["result"]["word"]>

  export type WordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    rank?: boolean
    freq?: boolean
    ukPhone?: boolean
    usPhone?: boolean
    trans?: boolean
    defEn?: boolean
    phrases?: boolean
    sents?: boolean
    exam?: boolean
    synos?: boolean
    relWords?: boolean
    mnemonic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["word"]>

  export type WordSelectScalar = {
    id?: boolean
    text?: boolean
    rank?: boolean
    freq?: boolean
    ukPhone?: boolean
    usPhone?: boolean
    trans?: boolean
    defEn?: boolean
    phrases?: boolean
    sents?: boolean
    exam?: boolean
    synos?: boolean
    relWords?: boolean
    mnemonic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progress?: boolean | Word$progressArgs<ExtArgs>
  }
  export type WordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Word"
    objects: {
      progress: Prisma.$WordProgressPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      rank: number
      freq: number
      ukPhone: string | null
      usPhone: string | null
      trans: string
      defEn: string | null
      phrases: string
      sents: string
      exam: string
      synos: string
      relWords: string
      mnemonic: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["word"]>
    composites: {}
  }

  type WordGetPayload<S extends boolean | null | undefined | WordDefaultArgs> = $Result.GetResult<Prisma.$WordPayload, S>

  type WordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WordCountAggregateInputType | true
    }

  export interface WordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Word'], meta: { name: 'Word' } }
    /**
     * Find zero or one Word that matches the filter.
     * @param {WordFindUniqueArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordFindUniqueArgs>(args: SelectSubset<T, WordFindUniqueArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Word that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WordFindUniqueOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordFindUniqueOrThrowArgs>(args: SelectSubset<T, WordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Word that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordFindFirstArgs>(args?: SelectSubset<T, WordFindFirstArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Word that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordFindFirstOrThrowArgs>(args?: SelectSubset<T, WordFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Words that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Words
     * const words = await prisma.word.findMany()
     * 
     * // Get first 10 Words
     * const words = await prisma.word.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordWithIdOnly = await prisma.word.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordFindManyArgs>(args?: SelectSubset<T, WordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Word.
     * @param {WordCreateArgs} args - Arguments to create a Word.
     * @example
     * // Create one Word
     * const Word = await prisma.word.create({
     *   data: {
     *     // ... data to create a Word
     *   }
     * })
     * 
     */
    create<T extends WordCreateArgs>(args: SelectSubset<T, WordCreateArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Words.
     * @param {WordCreateManyArgs} args - Arguments to create many Words.
     * @example
     * // Create many Words
     * const word = await prisma.word.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordCreateManyArgs>(args?: SelectSubset<T, WordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Words and returns the data saved in the database.
     * @param {WordCreateManyAndReturnArgs} args - Arguments to create many Words.
     * @example
     * // Create many Words
     * const word = await prisma.word.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Words and only return the `id`
     * const wordWithIdOnly = await prisma.word.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordCreateManyAndReturnArgs>(args?: SelectSubset<T, WordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Word.
     * @param {WordDeleteArgs} args - Arguments to delete one Word.
     * @example
     * // Delete one Word
     * const Word = await prisma.word.delete({
     *   where: {
     *     // ... filter to delete one Word
     *   }
     * })
     * 
     */
    delete<T extends WordDeleteArgs>(args: SelectSubset<T, WordDeleteArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Word.
     * @param {WordUpdateArgs} args - Arguments to update one Word.
     * @example
     * // Update one Word
     * const word = await prisma.word.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordUpdateArgs>(args: SelectSubset<T, WordUpdateArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Words.
     * @param {WordDeleteManyArgs} args - Arguments to filter Words to delete.
     * @example
     * // Delete a few Words
     * const { count } = await prisma.word.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordDeleteManyArgs>(args?: SelectSubset<T, WordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Words
     * const word = await prisma.word.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordUpdateManyArgs>(args: SelectSubset<T, WordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Word.
     * @param {WordUpsertArgs} args - Arguments to update or create a Word.
     * @example
     * // Update or create a Word
     * const word = await prisma.word.upsert({
     *   create: {
     *     // ... data to create a Word
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Word we want to update
     *   }
     * })
     */
    upsert<T extends WordUpsertArgs>(args: SelectSubset<T, WordUpsertArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordCountArgs} args - Arguments to filter Words to count.
     * @example
     * // Count the number of Words
     * const count = await prisma.word.count({
     *   where: {
     *     // ... the filter for the Words we want to count
     *   }
     * })
    **/
    count<T extends WordCountArgs>(
      args?: Subset<T, WordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordAggregateArgs>(args: Subset<T, WordAggregateArgs>): Prisma.PrismaPromise<GetWordAggregateType<T>>

    /**
     * Group by Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordGroupByArgs['orderBy'] }
        : { orderBy?: WordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Word model
   */
  readonly fields: WordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Word.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    progress<T extends Word$progressArgs<ExtArgs> = {}>(args?: Subset<T, Word$progressArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Word model
   */ 
  interface WordFieldRefs {
    readonly id: FieldRef<"Word", 'String'>
    readonly text: FieldRef<"Word", 'String'>
    readonly rank: FieldRef<"Word", 'Int'>
    readonly freq: FieldRef<"Word", 'Int'>
    readonly ukPhone: FieldRef<"Word", 'String'>
    readonly usPhone: FieldRef<"Word", 'String'>
    readonly trans: FieldRef<"Word", 'String'>
    readonly defEn: FieldRef<"Word", 'String'>
    readonly phrases: FieldRef<"Word", 'String'>
    readonly sents: FieldRef<"Word", 'String'>
    readonly exam: FieldRef<"Word", 'String'>
    readonly synos: FieldRef<"Word", 'String'>
    readonly relWords: FieldRef<"Word", 'String'>
    readonly mnemonic: FieldRef<"Word", 'String'>
    readonly createdAt: FieldRef<"Word", 'DateTime'>
    readonly updatedAt: FieldRef<"Word", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Word findUnique
   */
  export type WordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word findUniqueOrThrow
   */
  export type WordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word findFirst
   */
  export type WordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     */
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word findFirstOrThrow
   */
  export type WordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     */
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word findMany
   */
  export type WordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Words to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word create
   */
  export type WordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The data needed to create a Word.
     */
    data: XOR<WordCreateInput, WordUncheckedCreateInput>
  }

  /**
   * Word createMany
   */
  export type WordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Words.
     */
    data: WordCreateManyInput | WordCreateManyInput[]
  }

  /**
   * Word createManyAndReturn
   */
  export type WordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Words.
     */
    data: WordCreateManyInput | WordCreateManyInput[]
  }

  /**
   * Word update
   */
  export type WordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The data needed to update a Word.
     */
    data: XOR<WordUpdateInput, WordUncheckedUpdateInput>
    /**
     * Choose, which Word to update.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word updateMany
   */
  export type WordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Words.
     */
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyInput>
    /**
     * Filter which Words to update
     */
    where?: WordWhereInput
  }

  /**
   * Word upsert
   */
  export type WordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The filter to search for the Word to update in case it exists.
     */
    where: WordWhereUniqueInput
    /**
     * In case the Word found by the `where` argument doesn't exist, create a new Word with this data.
     */
    create: XOR<WordCreateInput, WordUncheckedCreateInput>
    /**
     * In case the Word was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordUpdateInput, WordUncheckedUpdateInput>
  }

  /**
   * Word delete
   */
  export type WordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter which Word to delete.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word deleteMany
   */
  export type WordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Words to delete
     */
    where?: WordWhereInput
  }

  /**
   * Word.progress
   */
  export type Word$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    where?: WordProgressWhereInput
  }

  /**
   * Word without action
   */
  export type WordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
  }


  /**
   * Model WordProgress
   */

  export type AggregateWordProgress = {
    _count: WordProgressCountAggregateOutputType | null
    _avg: WordProgressAvgAggregateOutputType | null
    _sum: WordProgressSumAggregateOutputType | null
    _min: WordProgressMinAggregateOutputType | null
    _max: WordProgressMaxAggregateOutputType | null
  }

  export type WordProgressAvgAggregateOutputType = {
    stage: number | null
    ease: number | null
    reps: number | null
    lapses: number | null
    recallLv: number | null
    spellLv: number | null
  }

  export type WordProgressSumAggregateOutputType = {
    stage: number | null
    ease: number | null
    reps: number | null
    lapses: number | null
    recallLv: number | null
    spellLv: number | null
  }

  export type WordProgressMinAggregateOutputType = {
    id: string | null
    wordId: string | null
    stage: number | null
    ease: number | null
    dueAt: Date | null
    reps: number | null
    lapses: number | null
    lastResult: string | null
    recallLv: number | null
    spellLv: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordProgressMaxAggregateOutputType = {
    id: string | null
    wordId: string | null
    stage: number | null
    ease: number | null
    dueAt: Date | null
    reps: number | null
    lapses: number | null
    lastResult: string | null
    recallLv: number | null
    spellLv: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordProgressCountAggregateOutputType = {
    id: number
    wordId: number
    stage: number
    ease: number
    dueAt: number
    reps: number
    lapses: number
    lastResult: number
    recallLv: number
    spellLv: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WordProgressAvgAggregateInputType = {
    stage?: true
    ease?: true
    reps?: true
    lapses?: true
    recallLv?: true
    spellLv?: true
  }

  export type WordProgressSumAggregateInputType = {
    stage?: true
    ease?: true
    reps?: true
    lapses?: true
    recallLv?: true
    spellLv?: true
  }

  export type WordProgressMinAggregateInputType = {
    id?: true
    wordId?: true
    stage?: true
    ease?: true
    dueAt?: true
    reps?: true
    lapses?: true
    lastResult?: true
    recallLv?: true
    spellLv?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordProgressMaxAggregateInputType = {
    id?: true
    wordId?: true
    stage?: true
    ease?: true
    dueAt?: true
    reps?: true
    lapses?: true
    lastResult?: true
    recallLv?: true
    spellLv?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordProgressCountAggregateInputType = {
    id?: true
    wordId?: true
    stage?: true
    ease?: true
    dueAt?: true
    reps?: true
    lapses?: true
    lastResult?: true
    recallLv?: true
    spellLv?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WordProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordProgress to aggregate.
     */
    where?: WordProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordProgresses to fetch.
     */
    orderBy?: WordProgressOrderByWithRelationInput | WordProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WordProgresses
    **/
    _count?: true | WordProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WordProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WordProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordProgressMaxAggregateInputType
  }

  export type GetWordProgressAggregateType<T extends WordProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateWordProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWordProgress[P]>
      : GetScalarType<T[P], AggregateWordProgress[P]>
  }




  export type WordProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordProgressWhereInput
    orderBy?: WordProgressOrderByWithAggregationInput | WordProgressOrderByWithAggregationInput[]
    by: WordProgressScalarFieldEnum[] | WordProgressScalarFieldEnum
    having?: WordProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordProgressCountAggregateInputType | true
    _avg?: WordProgressAvgAggregateInputType
    _sum?: WordProgressSumAggregateInputType
    _min?: WordProgressMinAggregateInputType
    _max?: WordProgressMaxAggregateInputType
  }

  export type WordProgressGroupByOutputType = {
    id: string
    wordId: string
    stage: number
    ease: number
    dueAt: Date
    reps: number
    lapses: number
    lastResult: string | null
    recallLv: number
    spellLv: number
    createdAt: Date
    updatedAt: Date
    _count: WordProgressCountAggregateOutputType | null
    _avg: WordProgressAvgAggregateOutputType | null
    _sum: WordProgressSumAggregateOutputType | null
    _min: WordProgressMinAggregateOutputType | null
    _max: WordProgressMaxAggregateOutputType | null
  }

  type GetWordProgressGroupByPayload<T extends WordProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordProgressGroupByOutputType[P]>
            : GetScalarType<T[P], WordProgressGroupByOutputType[P]>
        }
      >
    >


  export type WordProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wordId?: boolean
    stage?: boolean
    ease?: boolean
    dueAt?: boolean
    reps?: boolean
    lapses?: boolean
    lastResult?: boolean
    recallLv?: boolean
    spellLv?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordProgress"]>

  export type WordProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wordId?: boolean
    stage?: boolean
    ease?: boolean
    dueAt?: boolean
    reps?: boolean
    lapses?: boolean
    lastResult?: boolean
    recallLv?: boolean
    spellLv?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordProgress"]>

  export type WordProgressSelectScalar = {
    id?: boolean
    wordId?: boolean
    stage?: boolean
    ease?: boolean
    dueAt?: boolean
    reps?: boolean
    lapses?: boolean
    lastResult?: boolean
    recallLv?: boolean
    spellLv?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WordProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    word?: boolean | WordDefaultArgs<ExtArgs>
  }
  export type WordProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    word?: boolean | WordDefaultArgs<ExtArgs>
  }

  export type $WordProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WordProgress"
    objects: {
      word: Prisma.$WordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      wordId: string
      stage: number
      ease: number
      dueAt: Date
      reps: number
      lapses: number
      lastResult: string | null
      recallLv: number
      spellLv: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wordProgress"]>
    composites: {}
  }

  type WordProgressGetPayload<S extends boolean | null | undefined | WordProgressDefaultArgs> = $Result.GetResult<Prisma.$WordProgressPayload, S>

  type WordProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WordProgressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WordProgressCountAggregateInputType | true
    }

  export interface WordProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WordProgress'], meta: { name: 'WordProgress' } }
    /**
     * Find zero or one WordProgress that matches the filter.
     * @param {WordProgressFindUniqueArgs} args - Arguments to find a WordProgress
     * @example
     * // Get one WordProgress
     * const wordProgress = await prisma.wordProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordProgressFindUniqueArgs>(args: SelectSubset<T, WordProgressFindUniqueArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WordProgress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WordProgressFindUniqueOrThrowArgs} args - Arguments to find a WordProgress
     * @example
     * // Get one WordProgress
     * const wordProgress = await prisma.wordProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, WordProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WordProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressFindFirstArgs} args - Arguments to find a WordProgress
     * @example
     * // Get one WordProgress
     * const wordProgress = await prisma.wordProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordProgressFindFirstArgs>(args?: SelectSubset<T, WordProgressFindFirstArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WordProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressFindFirstOrThrowArgs} args - Arguments to find a WordProgress
     * @example
     * // Get one WordProgress
     * const wordProgress = await prisma.wordProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, WordProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WordProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WordProgresses
     * const wordProgresses = await prisma.wordProgress.findMany()
     * 
     * // Get first 10 WordProgresses
     * const wordProgresses = await prisma.wordProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordProgressWithIdOnly = await prisma.wordProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordProgressFindManyArgs>(args?: SelectSubset<T, WordProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WordProgress.
     * @param {WordProgressCreateArgs} args - Arguments to create a WordProgress.
     * @example
     * // Create one WordProgress
     * const WordProgress = await prisma.wordProgress.create({
     *   data: {
     *     // ... data to create a WordProgress
     *   }
     * })
     * 
     */
    create<T extends WordProgressCreateArgs>(args: SelectSubset<T, WordProgressCreateArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WordProgresses.
     * @param {WordProgressCreateManyArgs} args - Arguments to create many WordProgresses.
     * @example
     * // Create many WordProgresses
     * const wordProgress = await prisma.wordProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordProgressCreateManyArgs>(args?: SelectSubset<T, WordProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WordProgresses and returns the data saved in the database.
     * @param {WordProgressCreateManyAndReturnArgs} args - Arguments to create many WordProgresses.
     * @example
     * // Create many WordProgresses
     * const wordProgress = await prisma.wordProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WordProgresses and only return the `id`
     * const wordProgressWithIdOnly = await prisma.wordProgress.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, WordProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WordProgress.
     * @param {WordProgressDeleteArgs} args - Arguments to delete one WordProgress.
     * @example
     * // Delete one WordProgress
     * const WordProgress = await prisma.wordProgress.delete({
     *   where: {
     *     // ... filter to delete one WordProgress
     *   }
     * })
     * 
     */
    delete<T extends WordProgressDeleteArgs>(args: SelectSubset<T, WordProgressDeleteArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WordProgress.
     * @param {WordProgressUpdateArgs} args - Arguments to update one WordProgress.
     * @example
     * // Update one WordProgress
     * const wordProgress = await prisma.wordProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordProgressUpdateArgs>(args: SelectSubset<T, WordProgressUpdateArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WordProgresses.
     * @param {WordProgressDeleteManyArgs} args - Arguments to filter WordProgresses to delete.
     * @example
     * // Delete a few WordProgresses
     * const { count } = await prisma.wordProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordProgressDeleteManyArgs>(args?: SelectSubset<T, WordProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WordProgresses
     * const wordProgress = await prisma.wordProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordProgressUpdateManyArgs>(args: SelectSubset<T, WordProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WordProgress.
     * @param {WordProgressUpsertArgs} args - Arguments to update or create a WordProgress.
     * @example
     * // Update or create a WordProgress
     * const wordProgress = await prisma.wordProgress.upsert({
     *   create: {
     *     // ... data to create a WordProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WordProgress we want to update
     *   }
     * })
     */
    upsert<T extends WordProgressUpsertArgs>(args: SelectSubset<T, WordProgressUpsertArgs<ExtArgs>>): Prisma__WordProgressClient<$Result.GetResult<Prisma.$WordProgressPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WordProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressCountArgs} args - Arguments to filter WordProgresses to count.
     * @example
     * // Count the number of WordProgresses
     * const count = await prisma.wordProgress.count({
     *   where: {
     *     // ... the filter for the WordProgresses we want to count
     *   }
     * })
    **/
    count<T extends WordProgressCountArgs>(
      args?: Subset<T, WordProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WordProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordProgressAggregateArgs>(args: Subset<T, WordProgressAggregateArgs>): Prisma.PrismaPromise<GetWordProgressAggregateType<T>>

    /**
     * Group by WordProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordProgressGroupByArgs['orderBy'] }
        : { orderBy?: WordProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WordProgress model
   */
  readonly fields: WordProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WordProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    word<T extends WordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordDefaultArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WordProgress model
   */ 
  interface WordProgressFieldRefs {
    readonly id: FieldRef<"WordProgress", 'String'>
    readonly wordId: FieldRef<"WordProgress", 'String'>
    readonly stage: FieldRef<"WordProgress", 'Int'>
    readonly ease: FieldRef<"WordProgress", 'Float'>
    readonly dueAt: FieldRef<"WordProgress", 'DateTime'>
    readonly reps: FieldRef<"WordProgress", 'Int'>
    readonly lapses: FieldRef<"WordProgress", 'Int'>
    readonly lastResult: FieldRef<"WordProgress", 'String'>
    readonly recallLv: FieldRef<"WordProgress", 'Int'>
    readonly spellLv: FieldRef<"WordProgress", 'Int'>
    readonly createdAt: FieldRef<"WordProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"WordProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WordProgress findUnique
   */
  export type WordProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * Filter, which WordProgress to fetch.
     */
    where: WordProgressWhereUniqueInput
  }

  /**
   * WordProgress findUniqueOrThrow
   */
  export type WordProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * Filter, which WordProgress to fetch.
     */
    where: WordProgressWhereUniqueInput
  }

  /**
   * WordProgress findFirst
   */
  export type WordProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * Filter, which WordProgress to fetch.
     */
    where?: WordProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordProgresses to fetch.
     */
    orderBy?: WordProgressOrderByWithRelationInput | WordProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordProgresses.
     */
    cursor?: WordProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordProgresses.
     */
    distinct?: WordProgressScalarFieldEnum | WordProgressScalarFieldEnum[]
  }

  /**
   * WordProgress findFirstOrThrow
   */
  export type WordProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * Filter, which WordProgress to fetch.
     */
    where?: WordProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordProgresses to fetch.
     */
    orderBy?: WordProgressOrderByWithRelationInput | WordProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordProgresses.
     */
    cursor?: WordProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordProgresses.
     */
    distinct?: WordProgressScalarFieldEnum | WordProgressScalarFieldEnum[]
  }

  /**
   * WordProgress findMany
   */
  export type WordProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * Filter, which WordProgresses to fetch.
     */
    where?: WordProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordProgresses to fetch.
     */
    orderBy?: WordProgressOrderByWithRelationInput | WordProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WordProgresses.
     */
    cursor?: WordProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordProgresses.
     */
    skip?: number
    distinct?: WordProgressScalarFieldEnum | WordProgressScalarFieldEnum[]
  }

  /**
   * WordProgress create
   */
  export type WordProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a WordProgress.
     */
    data: XOR<WordProgressCreateInput, WordProgressUncheckedCreateInput>
  }

  /**
   * WordProgress createMany
   */
  export type WordProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WordProgresses.
     */
    data: WordProgressCreateManyInput | WordProgressCreateManyInput[]
  }

  /**
   * WordProgress createManyAndReturn
   */
  export type WordProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WordProgresses.
     */
    data: WordProgressCreateManyInput | WordProgressCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WordProgress update
   */
  export type WordProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a WordProgress.
     */
    data: XOR<WordProgressUpdateInput, WordProgressUncheckedUpdateInput>
    /**
     * Choose, which WordProgress to update.
     */
    where: WordProgressWhereUniqueInput
  }

  /**
   * WordProgress updateMany
   */
  export type WordProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WordProgresses.
     */
    data: XOR<WordProgressUpdateManyMutationInput, WordProgressUncheckedUpdateManyInput>
    /**
     * Filter which WordProgresses to update
     */
    where?: WordProgressWhereInput
  }

  /**
   * WordProgress upsert
   */
  export type WordProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the WordProgress to update in case it exists.
     */
    where: WordProgressWhereUniqueInput
    /**
     * In case the WordProgress found by the `where` argument doesn't exist, create a new WordProgress with this data.
     */
    create: XOR<WordProgressCreateInput, WordProgressUncheckedCreateInput>
    /**
     * In case the WordProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordProgressUpdateInput, WordProgressUncheckedUpdateInput>
  }

  /**
   * WordProgress delete
   */
  export type WordProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
    /**
     * Filter which WordProgress to delete.
     */
    where: WordProgressWhereUniqueInput
  }

  /**
   * WordProgress deleteMany
   */
  export type WordProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordProgresses to delete
     */
    where?: WordProgressWhereInput
  }

  /**
   * WordProgress without action
   */
  export type WordProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordProgress
     */
    select?: WordProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordProgressInclude<ExtArgs> | null
  }


  /**
   * Model NotebookItem
   */

  export type AggregateNotebookItem = {
    _count: NotebookItemCountAggregateOutputType | null
    _avg: NotebookItemAvgAggregateOutputType | null
    _sum: NotebookItemSumAggregateOutputType | null
    _min: NotebookItemMinAggregateOutputType | null
    _max: NotebookItemMaxAggregateOutputType | null
  }

  export type NotebookItemAvgAggregateOutputType = {
    stage: number | null
    reps: number | null
    lapses: number | null
  }

  export type NotebookItemSumAggregateOutputType = {
    stage: number | null
    reps: number | null
    lapses: number | null
  }

  export type NotebookItemMinAggregateOutputType = {
    id: string | null
    kind: string | null
    source: string | null
    title: string | null
    content: string | null
    answer: string | null
    myAnswer: string | null
    note: string | null
    tags: string | null
    refId: string | null
    stage: number | null
    dueAt: Date | null
    reps: number | null
    lapses: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotebookItemMaxAggregateOutputType = {
    id: string | null
    kind: string | null
    source: string | null
    title: string | null
    content: string | null
    answer: string | null
    myAnswer: string | null
    note: string | null
    tags: string | null
    refId: string | null
    stage: number | null
    dueAt: Date | null
    reps: number | null
    lapses: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotebookItemCountAggregateOutputType = {
    id: number
    kind: number
    source: number
    title: number
    content: number
    answer: number
    myAnswer: number
    note: number
    tags: number
    refId: number
    stage: number
    dueAt: number
    reps: number
    lapses: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotebookItemAvgAggregateInputType = {
    stage?: true
    reps?: true
    lapses?: true
  }

  export type NotebookItemSumAggregateInputType = {
    stage?: true
    reps?: true
    lapses?: true
  }

  export type NotebookItemMinAggregateInputType = {
    id?: true
    kind?: true
    source?: true
    title?: true
    content?: true
    answer?: true
    myAnswer?: true
    note?: true
    tags?: true
    refId?: true
    stage?: true
    dueAt?: true
    reps?: true
    lapses?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotebookItemMaxAggregateInputType = {
    id?: true
    kind?: true
    source?: true
    title?: true
    content?: true
    answer?: true
    myAnswer?: true
    note?: true
    tags?: true
    refId?: true
    stage?: true
    dueAt?: true
    reps?: true
    lapses?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotebookItemCountAggregateInputType = {
    id?: true
    kind?: true
    source?: true
    title?: true
    content?: true
    answer?: true
    myAnswer?: true
    note?: true
    tags?: true
    refId?: true
    stage?: true
    dueAt?: true
    reps?: true
    lapses?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotebookItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotebookItem to aggregate.
     */
    where?: NotebookItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotebookItems to fetch.
     */
    orderBy?: NotebookItemOrderByWithRelationInput | NotebookItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotebookItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotebookItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotebookItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotebookItems
    **/
    _count?: true | NotebookItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotebookItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotebookItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotebookItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotebookItemMaxAggregateInputType
  }

  export type GetNotebookItemAggregateType<T extends NotebookItemAggregateArgs> = {
        [P in keyof T & keyof AggregateNotebookItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotebookItem[P]>
      : GetScalarType<T[P], AggregateNotebookItem[P]>
  }




  export type NotebookItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotebookItemWhereInput
    orderBy?: NotebookItemOrderByWithAggregationInput | NotebookItemOrderByWithAggregationInput[]
    by: NotebookItemScalarFieldEnum[] | NotebookItemScalarFieldEnum
    having?: NotebookItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotebookItemCountAggregateInputType | true
    _avg?: NotebookItemAvgAggregateInputType
    _sum?: NotebookItemSumAggregateInputType
    _min?: NotebookItemMinAggregateInputType
    _max?: NotebookItemMaxAggregateInputType
  }

  export type NotebookItemGroupByOutputType = {
    id: string
    kind: string
    source: string
    title: string
    content: string
    answer: string | null
    myAnswer: string | null
    note: string | null
    tags: string
    refId: string | null
    stage: number
    dueAt: Date | null
    reps: number
    lapses: number
    createdAt: Date
    updatedAt: Date
    _count: NotebookItemCountAggregateOutputType | null
    _avg: NotebookItemAvgAggregateOutputType | null
    _sum: NotebookItemSumAggregateOutputType | null
    _min: NotebookItemMinAggregateOutputType | null
    _max: NotebookItemMaxAggregateOutputType | null
  }

  type GetNotebookItemGroupByPayload<T extends NotebookItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotebookItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotebookItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotebookItemGroupByOutputType[P]>
            : GetScalarType<T[P], NotebookItemGroupByOutputType[P]>
        }
      >
    >


  export type NotebookItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    source?: boolean
    title?: boolean
    content?: boolean
    answer?: boolean
    myAnswer?: boolean
    note?: boolean
    tags?: boolean
    refId?: boolean
    stage?: boolean
    dueAt?: boolean
    reps?: boolean
    lapses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notebookItem"]>

  export type NotebookItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    source?: boolean
    title?: boolean
    content?: boolean
    answer?: boolean
    myAnswer?: boolean
    note?: boolean
    tags?: boolean
    refId?: boolean
    stage?: boolean
    dueAt?: boolean
    reps?: boolean
    lapses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notebookItem"]>

  export type NotebookItemSelectScalar = {
    id?: boolean
    kind?: boolean
    source?: boolean
    title?: boolean
    content?: boolean
    answer?: boolean
    myAnswer?: boolean
    note?: boolean
    tags?: boolean
    refId?: boolean
    stage?: boolean
    dueAt?: boolean
    reps?: boolean
    lapses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $NotebookItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotebookItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kind: string
      source: string
      title: string
      content: string
      answer: string | null
      myAnswer: string | null
      note: string | null
      tags: string
      refId: string | null
      stage: number
      dueAt: Date | null
      reps: number
      lapses: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notebookItem"]>
    composites: {}
  }

  type NotebookItemGetPayload<S extends boolean | null | undefined | NotebookItemDefaultArgs> = $Result.GetResult<Prisma.$NotebookItemPayload, S>

  type NotebookItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotebookItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotebookItemCountAggregateInputType | true
    }

  export interface NotebookItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotebookItem'], meta: { name: 'NotebookItem' } }
    /**
     * Find zero or one NotebookItem that matches the filter.
     * @param {NotebookItemFindUniqueArgs} args - Arguments to find a NotebookItem
     * @example
     * // Get one NotebookItem
     * const notebookItem = await prisma.notebookItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotebookItemFindUniqueArgs>(args: SelectSubset<T, NotebookItemFindUniqueArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NotebookItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotebookItemFindUniqueOrThrowArgs} args - Arguments to find a NotebookItem
     * @example
     * // Get one NotebookItem
     * const notebookItem = await prisma.notebookItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotebookItemFindUniqueOrThrowArgs>(args: SelectSubset<T, NotebookItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NotebookItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemFindFirstArgs} args - Arguments to find a NotebookItem
     * @example
     * // Get one NotebookItem
     * const notebookItem = await prisma.notebookItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotebookItemFindFirstArgs>(args?: SelectSubset<T, NotebookItemFindFirstArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NotebookItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemFindFirstOrThrowArgs} args - Arguments to find a NotebookItem
     * @example
     * // Get one NotebookItem
     * const notebookItem = await prisma.notebookItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotebookItemFindFirstOrThrowArgs>(args?: SelectSubset<T, NotebookItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NotebookItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotebookItems
     * const notebookItems = await prisma.notebookItem.findMany()
     * 
     * // Get first 10 NotebookItems
     * const notebookItems = await prisma.notebookItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notebookItemWithIdOnly = await prisma.notebookItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotebookItemFindManyArgs>(args?: SelectSubset<T, NotebookItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NotebookItem.
     * @param {NotebookItemCreateArgs} args - Arguments to create a NotebookItem.
     * @example
     * // Create one NotebookItem
     * const NotebookItem = await prisma.notebookItem.create({
     *   data: {
     *     // ... data to create a NotebookItem
     *   }
     * })
     * 
     */
    create<T extends NotebookItemCreateArgs>(args: SelectSubset<T, NotebookItemCreateArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NotebookItems.
     * @param {NotebookItemCreateManyArgs} args - Arguments to create many NotebookItems.
     * @example
     * // Create many NotebookItems
     * const notebookItem = await prisma.notebookItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotebookItemCreateManyArgs>(args?: SelectSubset<T, NotebookItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotebookItems and returns the data saved in the database.
     * @param {NotebookItemCreateManyAndReturnArgs} args - Arguments to create many NotebookItems.
     * @example
     * // Create many NotebookItems
     * const notebookItem = await prisma.notebookItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotebookItems and only return the `id`
     * const notebookItemWithIdOnly = await prisma.notebookItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotebookItemCreateManyAndReturnArgs>(args?: SelectSubset<T, NotebookItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NotebookItem.
     * @param {NotebookItemDeleteArgs} args - Arguments to delete one NotebookItem.
     * @example
     * // Delete one NotebookItem
     * const NotebookItem = await prisma.notebookItem.delete({
     *   where: {
     *     // ... filter to delete one NotebookItem
     *   }
     * })
     * 
     */
    delete<T extends NotebookItemDeleteArgs>(args: SelectSubset<T, NotebookItemDeleteArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NotebookItem.
     * @param {NotebookItemUpdateArgs} args - Arguments to update one NotebookItem.
     * @example
     * // Update one NotebookItem
     * const notebookItem = await prisma.notebookItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotebookItemUpdateArgs>(args: SelectSubset<T, NotebookItemUpdateArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NotebookItems.
     * @param {NotebookItemDeleteManyArgs} args - Arguments to filter NotebookItems to delete.
     * @example
     * // Delete a few NotebookItems
     * const { count } = await prisma.notebookItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotebookItemDeleteManyArgs>(args?: SelectSubset<T, NotebookItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotebookItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotebookItems
     * const notebookItem = await prisma.notebookItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotebookItemUpdateManyArgs>(args: SelectSubset<T, NotebookItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NotebookItem.
     * @param {NotebookItemUpsertArgs} args - Arguments to update or create a NotebookItem.
     * @example
     * // Update or create a NotebookItem
     * const notebookItem = await prisma.notebookItem.upsert({
     *   create: {
     *     // ... data to create a NotebookItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotebookItem we want to update
     *   }
     * })
     */
    upsert<T extends NotebookItemUpsertArgs>(args: SelectSubset<T, NotebookItemUpsertArgs<ExtArgs>>): Prisma__NotebookItemClient<$Result.GetResult<Prisma.$NotebookItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NotebookItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemCountArgs} args - Arguments to filter NotebookItems to count.
     * @example
     * // Count the number of NotebookItems
     * const count = await prisma.notebookItem.count({
     *   where: {
     *     // ... the filter for the NotebookItems we want to count
     *   }
     * })
    **/
    count<T extends NotebookItemCountArgs>(
      args?: Subset<T, NotebookItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotebookItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotebookItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotebookItemAggregateArgs>(args: Subset<T, NotebookItemAggregateArgs>): Prisma.PrismaPromise<GetNotebookItemAggregateType<T>>

    /**
     * Group by NotebookItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotebookItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotebookItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotebookItemGroupByArgs['orderBy'] }
        : { orderBy?: NotebookItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotebookItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotebookItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotebookItem model
   */
  readonly fields: NotebookItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotebookItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotebookItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotebookItem model
   */ 
  interface NotebookItemFieldRefs {
    readonly id: FieldRef<"NotebookItem", 'String'>
    readonly kind: FieldRef<"NotebookItem", 'String'>
    readonly source: FieldRef<"NotebookItem", 'String'>
    readonly title: FieldRef<"NotebookItem", 'String'>
    readonly content: FieldRef<"NotebookItem", 'String'>
    readonly answer: FieldRef<"NotebookItem", 'String'>
    readonly myAnswer: FieldRef<"NotebookItem", 'String'>
    readonly note: FieldRef<"NotebookItem", 'String'>
    readonly tags: FieldRef<"NotebookItem", 'String'>
    readonly refId: FieldRef<"NotebookItem", 'String'>
    readonly stage: FieldRef<"NotebookItem", 'Int'>
    readonly dueAt: FieldRef<"NotebookItem", 'DateTime'>
    readonly reps: FieldRef<"NotebookItem", 'Int'>
    readonly lapses: FieldRef<"NotebookItem", 'Int'>
    readonly createdAt: FieldRef<"NotebookItem", 'DateTime'>
    readonly updatedAt: FieldRef<"NotebookItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotebookItem findUnique
   */
  export type NotebookItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * Filter, which NotebookItem to fetch.
     */
    where: NotebookItemWhereUniqueInput
  }

  /**
   * NotebookItem findUniqueOrThrow
   */
  export type NotebookItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * Filter, which NotebookItem to fetch.
     */
    where: NotebookItemWhereUniqueInput
  }

  /**
   * NotebookItem findFirst
   */
  export type NotebookItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * Filter, which NotebookItem to fetch.
     */
    where?: NotebookItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotebookItems to fetch.
     */
    orderBy?: NotebookItemOrderByWithRelationInput | NotebookItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotebookItems.
     */
    cursor?: NotebookItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotebookItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotebookItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotebookItems.
     */
    distinct?: NotebookItemScalarFieldEnum | NotebookItemScalarFieldEnum[]
  }

  /**
   * NotebookItem findFirstOrThrow
   */
  export type NotebookItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * Filter, which NotebookItem to fetch.
     */
    where?: NotebookItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotebookItems to fetch.
     */
    orderBy?: NotebookItemOrderByWithRelationInput | NotebookItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotebookItems.
     */
    cursor?: NotebookItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotebookItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotebookItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotebookItems.
     */
    distinct?: NotebookItemScalarFieldEnum | NotebookItemScalarFieldEnum[]
  }

  /**
   * NotebookItem findMany
   */
  export type NotebookItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * Filter, which NotebookItems to fetch.
     */
    where?: NotebookItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotebookItems to fetch.
     */
    orderBy?: NotebookItemOrderByWithRelationInput | NotebookItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotebookItems.
     */
    cursor?: NotebookItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotebookItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotebookItems.
     */
    skip?: number
    distinct?: NotebookItemScalarFieldEnum | NotebookItemScalarFieldEnum[]
  }

  /**
   * NotebookItem create
   */
  export type NotebookItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * The data needed to create a NotebookItem.
     */
    data: XOR<NotebookItemCreateInput, NotebookItemUncheckedCreateInput>
  }

  /**
   * NotebookItem createMany
   */
  export type NotebookItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotebookItems.
     */
    data: NotebookItemCreateManyInput | NotebookItemCreateManyInput[]
  }

  /**
   * NotebookItem createManyAndReturn
   */
  export type NotebookItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NotebookItems.
     */
    data: NotebookItemCreateManyInput | NotebookItemCreateManyInput[]
  }

  /**
   * NotebookItem update
   */
  export type NotebookItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * The data needed to update a NotebookItem.
     */
    data: XOR<NotebookItemUpdateInput, NotebookItemUncheckedUpdateInput>
    /**
     * Choose, which NotebookItem to update.
     */
    where: NotebookItemWhereUniqueInput
  }

  /**
   * NotebookItem updateMany
   */
  export type NotebookItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotebookItems.
     */
    data: XOR<NotebookItemUpdateManyMutationInput, NotebookItemUncheckedUpdateManyInput>
    /**
     * Filter which NotebookItems to update
     */
    where?: NotebookItemWhereInput
  }

  /**
   * NotebookItem upsert
   */
  export type NotebookItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * The filter to search for the NotebookItem to update in case it exists.
     */
    where: NotebookItemWhereUniqueInput
    /**
     * In case the NotebookItem found by the `where` argument doesn't exist, create a new NotebookItem with this data.
     */
    create: XOR<NotebookItemCreateInput, NotebookItemUncheckedCreateInput>
    /**
     * In case the NotebookItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotebookItemUpdateInput, NotebookItemUncheckedUpdateInput>
  }

  /**
   * NotebookItem delete
   */
  export type NotebookItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
    /**
     * Filter which NotebookItem to delete.
     */
    where: NotebookItemWhereUniqueInput
  }

  /**
   * NotebookItem deleteMany
   */
  export type NotebookItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotebookItems to delete
     */
    where?: NotebookItemWhereInput
  }

  /**
   * NotebookItem without action
   */
  export type NotebookItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotebookItem
     */
    select?: NotebookItemSelect<ExtArgs> | null
  }


  /**
   * Model StudySession
   */

  export type AggregateStudySession = {
    _count: StudySessionCountAggregateOutputType | null
    _avg: StudySessionAvgAggregateOutputType | null
    _sum: StudySessionSumAggregateOutputType | null
    _min: StudySessionMinAggregateOutputType | null
    _max: StudySessionMaxAggregateOutputType | null
  }

  export type StudySessionAvgAggregateOutputType = {
    minutes: number | null
    pomodoros: number | null
  }

  export type StudySessionSumAggregateOutputType = {
    minutes: number | null
    pomodoros: number | null
  }

  export type StudySessionMinAggregateOutputType = {
    id: string | null
    kind: string | null
    minutes: number | null
    pomodoros: number | null
    startedAt: Date | null
    endedAt: Date | null
    note: string | null
    createdAt: Date | null
  }

  export type StudySessionMaxAggregateOutputType = {
    id: string | null
    kind: string | null
    minutes: number | null
    pomodoros: number | null
    startedAt: Date | null
    endedAt: Date | null
    note: string | null
    createdAt: Date | null
  }

  export type StudySessionCountAggregateOutputType = {
    id: number
    kind: number
    minutes: number
    pomodoros: number
    startedAt: number
    endedAt: number
    note: number
    createdAt: number
    _all: number
  }


  export type StudySessionAvgAggregateInputType = {
    minutes?: true
    pomodoros?: true
  }

  export type StudySessionSumAggregateInputType = {
    minutes?: true
    pomodoros?: true
  }

  export type StudySessionMinAggregateInputType = {
    id?: true
    kind?: true
    minutes?: true
    pomodoros?: true
    startedAt?: true
    endedAt?: true
    note?: true
    createdAt?: true
  }

  export type StudySessionMaxAggregateInputType = {
    id?: true
    kind?: true
    minutes?: true
    pomodoros?: true
    startedAt?: true
    endedAt?: true
    note?: true
    createdAt?: true
  }

  export type StudySessionCountAggregateInputType = {
    id?: true
    kind?: true
    minutes?: true
    pomodoros?: true
    startedAt?: true
    endedAt?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type StudySessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudySession to aggregate.
     */
    where?: StudySessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudySessions to fetch.
     */
    orderBy?: StudySessionOrderByWithRelationInput | StudySessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudySessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudySessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudySessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudySessions
    **/
    _count?: true | StudySessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudySessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudySessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudySessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudySessionMaxAggregateInputType
  }

  export type GetStudySessionAggregateType<T extends StudySessionAggregateArgs> = {
        [P in keyof T & keyof AggregateStudySession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudySession[P]>
      : GetScalarType<T[P], AggregateStudySession[P]>
  }




  export type StudySessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudySessionWhereInput
    orderBy?: StudySessionOrderByWithAggregationInput | StudySessionOrderByWithAggregationInput[]
    by: StudySessionScalarFieldEnum[] | StudySessionScalarFieldEnum
    having?: StudySessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudySessionCountAggregateInputType | true
    _avg?: StudySessionAvgAggregateInputType
    _sum?: StudySessionSumAggregateInputType
    _min?: StudySessionMinAggregateInputType
    _max?: StudySessionMaxAggregateInputType
  }

  export type StudySessionGroupByOutputType = {
    id: string
    kind: string
    minutes: number
    pomodoros: number
    startedAt: Date
    endedAt: Date | null
    note: string | null
    createdAt: Date
    _count: StudySessionCountAggregateOutputType | null
    _avg: StudySessionAvgAggregateOutputType | null
    _sum: StudySessionSumAggregateOutputType | null
    _min: StudySessionMinAggregateOutputType | null
    _max: StudySessionMaxAggregateOutputType | null
  }

  type GetStudySessionGroupByPayload<T extends StudySessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudySessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudySessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudySessionGroupByOutputType[P]>
            : GetScalarType<T[P], StudySessionGroupByOutputType[P]>
        }
      >
    >


  export type StudySessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    minutes?: boolean
    pomodoros?: boolean
    startedAt?: boolean
    endedAt?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["studySession"]>

  export type StudySessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kind?: boolean
    minutes?: boolean
    pomodoros?: boolean
    startedAt?: boolean
    endedAt?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["studySession"]>

  export type StudySessionSelectScalar = {
    id?: boolean
    kind?: boolean
    minutes?: boolean
    pomodoros?: boolean
    startedAt?: boolean
    endedAt?: boolean
    note?: boolean
    createdAt?: boolean
  }


  export type $StudySessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudySession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kind: string
      minutes: number
      pomodoros: number
      startedAt: Date
      endedAt: Date | null
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["studySession"]>
    composites: {}
  }

  type StudySessionGetPayload<S extends boolean | null | undefined | StudySessionDefaultArgs> = $Result.GetResult<Prisma.$StudySessionPayload, S>

  type StudySessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudySessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudySessionCountAggregateInputType | true
    }

  export interface StudySessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudySession'], meta: { name: 'StudySession' } }
    /**
     * Find zero or one StudySession that matches the filter.
     * @param {StudySessionFindUniqueArgs} args - Arguments to find a StudySession
     * @example
     * // Get one StudySession
     * const studySession = await prisma.studySession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudySessionFindUniqueArgs>(args: SelectSubset<T, StudySessionFindUniqueArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StudySession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudySessionFindUniqueOrThrowArgs} args - Arguments to find a StudySession
     * @example
     * // Get one StudySession
     * const studySession = await prisma.studySession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudySessionFindUniqueOrThrowArgs>(args: SelectSubset<T, StudySessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StudySession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionFindFirstArgs} args - Arguments to find a StudySession
     * @example
     * // Get one StudySession
     * const studySession = await prisma.studySession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudySessionFindFirstArgs>(args?: SelectSubset<T, StudySessionFindFirstArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StudySession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionFindFirstOrThrowArgs} args - Arguments to find a StudySession
     * @example
     * // Get one StudySession
     * const studySession = await prisma.studySession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudySessionFindFirstOrThrowArgs>(args?: SelectSubset<T, StudySessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StudySessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudySessions
     * const studySessions = await prisma.studySession.findMany()
     * 
     * // Get first 10 StudySessions
     * const studySessions = await prisma.studySession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studySessionWithIdOnly = await prisma.studySession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudySessionFindManyArgs>(args?: SelectSubset<T, StudySessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StudySession.
     * @param {StudySessionCreateArgs} args - Arguments to create a StudySession.
     * @example
     * // Create one StudySession
     * const StudySession = await prisma.studySession.create({
     *   data: {
     *     // ... data to create a StudySession
     *   }
     * })
     * 
     */
    create<T extends StudySessionCreateArgs>(args: SelectSubset<T, StudySessionCreateArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StudySessions.
     * @param {StudySessionCreateManyArgs} args - Arguments to create many StudySessions.
     * @example
     * // Create many StudySessions
     * const studySession = await prisma.studySession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudySessionCreateManyArgs>(args?: SelectSubset<T, StudySessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudySessions and returns the data saved in the database.
     * @param {StudySessionCreateManyAndReturnArgs} args - Arguments to create many StudySessions.
     * @example
     * // Create many StudySessions
     * const studySession = await prisma.studySession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudySessions and only return the `id`
     * const studySessionWithIdOnly = await prisma.studySession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudySessionCreateManyAndReturnArgs>(args?: SelectSubset<T, StudySessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StudySession.
     * @param {StudySessionDeleteArgs} args - Arguments to delete one StudySession.
     * @example
     * // Delete one StudySession
     * const StudySession = await prisma.studySession.delete({
     *   where: {
     *     // ... filter to delete one StudySession
     *   }
     * })
     * 
     */
    delete<T extends StudySessionDeleteArgs>(args: SelectSubset<T, StudySessionDeleteArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StudySession.
     * @param {StudySessionUpdateArgs} args - Arguments to update one StudySession.
     * @example
     * // Update one StudySession
     * const studySession = await prisma.studySession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudySessionUpdateArgs>(args: SelectSubset<T, StudySessionUpdateArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StudySessions.
     * @param {StudySessionDeleteManyArgs} args - Arguments to filter StudySessions to delete.
     * @example
     * // Delete a few StudySessions
     * const { count } = await prisma.studySession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudySessionDeleteManyArgs>(args?: SelectSubset<T, StudySessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudySessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudySessions
     * const studySession = await prisma.studySession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudySessionUpdateManyArgs>(args: SelectSubset<T, StudySessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StudySession.
     * @param {StudySessionUpsertArgs} args - Arguments to update or create a StudySession.
     * @example
     * // Update or create a StudySession
     * const studySession = await prisma.studySession.upsert({
     *   create: {
     *     // ... data to create a StudySession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudySession we want to update
     *   }
     * })
     */
    upsert<T extends StudySessionUpsertArgs>(args: SelectSubset<T, StudySessionUpsertArgs<ExtArgs>>): Prisma__StudySessionClient<$Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StudySessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionCountArgs} args - Arguments to filter StudySessions to count.
     * @example
     * // Count the number of StudySessions
     * const count = await prisma.studySession.count({
     *   where: {
     *     // ... the filter for the StudySessions we want to count
     *   }
     * })
    **/
    count<T extends StudySessionCountArgs>(
      args?: Subset<T, StudySessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudySessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudySession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudySessionAggregateArgs>(args: Subset<T, StudySessionAggregateArgs>): Prisma.PrismaPromise<GetStudySessionAggregateType<T>>

    /**
     * Group by StudySession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudySessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudySessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudySessionGroupByArgs['orderBy'] }
        : { orderBy?: StudySessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudySessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudySessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudySession model
   */
  readonly fields: StudySessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudySession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudySessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudySession model
   */ 
  interface StudySessionFieldRefs {
    readonly id: FieldRef<"StudySession", 'String'>
    readonly kind: FieldRef<"StudySession", 'String'>
    readonly minutes: FieldRef<"StudySession", 'Int'>
    readonly pomodoros: FieldRef<"StudySession", 'Int'>
    readonly startedAt: FieldRef<"StudySession", 'DateTime'>
    readonly endedAt: FieldRef<"StudySession", 'DateTime'>
    readonly note: FieldRef<"StudySession", 'String'>
    readonly createdAt: FieldRef<"StudySession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudySession findUnique
   */
  export type StudySessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * Filter, which StudySession to fetch.
     */
    where: StudySessionWhereUniqueInput
  }

  /**
   * StudySession findUniqueOrThrow
   */
  export type StudySessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * Filter, which StudySession to fetch.
     */
    where: StudySessionWhereUniqueInput
  }

  /**
   * StudySession findFirst
   */
  export type StudySessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * Filter, which StudySession to fetch.
     */
    where?: StudySessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudySessions to fetch.
     */
    orderBy?: StudySessionOrderByWithRelationInput | StudySessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudySessions.
     */
    cursor?: StudySessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudySessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudySessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudySessions.
     */
    distinct?: StudySessionScalarFieldEnum | StudySessionScalarFieldEnum[]
  }

  /**
   * StudySession findFirstOrThrow
   */
  export type StudySessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * Filter, which StudySession to fetch.
     */
    where?: StudySessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudySessions to fetch.
     */
    orderBy?: StudySessionOrderByWithRelationInput | StudySessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudySessions.
     */
    cursor?: StudySessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudySessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudySessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudySessions.
     */
    distinct?: StudySessionScalarFieldEnum | StudySessionScalarFieldEnum[]
  }

  /**
   * StudySession findMany
   */
  export type StudySessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * Filter, which StudySessions to fetch.
     */
    where?: StudySessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudySessions to fetch.
     */
    orderBy?: StudySessionOrderByWithRelationInput | StudySessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudySessions.
     */
    cursor?: StudySessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudySessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudySessions.
     */
    skip?: number
    distinct?: StudySessionScalarFieldEnum | StudySessionScalarFieldEnum[]
  }

  /**
   * StudySession create
   */
  export type StudySessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * The data needed to create a StudySession.
     */
    data: XOR<StudySessionCreateInput, StudySessionUncheckedCreateInput>
  }

  /**
   * StudySession createMany
   */
  export type StudySessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudySessions.
     */
    data: StudySessionCreateManyInput | StudySessionCreateManyInput[]
  }

  /**
   * StudySession createManyAndReturn
   */
  export type StudySessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StudySessions.
     */
    data: StudySessionCreateManyInput | StudySessionCreateManyInput[]
  }

  /**
   * StudySession update
   */
  export type StudySessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * The data needed to update a StudySession.
     */
    data: XOR<StudySessionUpdateInput, StudySessionUncheckedUpdateInput>
    /**
     * Choose, which StudySession to update.
     */
    where: StudySessionWhereUniqueInput
  }

  /**
   * StudySession updateMany
   */
  export type StudySessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudySessions.
     */
    data: XOR<StudySessionUpdateManyMutationInput, StudySessionUncheckedUpdateManyInput>
    /**
     * Filter which StudySessions to update
     */
    where?: StudySessionWhereInput
  }

  /**
   * StudySession upsert
   */
  export type StudySessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * The filter to search for the StudySession to update in case it exists.
     */
    where: StudySessionWhereUniqueInput
    /**
     * In case the StudySession found by the `where` argument doesn't exist, create a new StudySession with this data.
     */
    create: XOR<StudySessionCreateInput, StudySessionUncheckedCreateInput>
    /**
     * In case the StudySession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudySessionUpdateInput, StudySessionUncheckedUpdateInput>
  }

  /**
   * StudySession delete
   */
  export type StudySessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
    /**
     * Filter which StudySession to delete.
     */
    where: StudySessionWhereUniqueInput
  }

  /**
   * StudySession deleteMany
   */
  export type StudySessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudySessions to delete
     */
    where?: StudySessionWhereInput
  }

  /**
   * StudySession without action
   */
  export type StudySessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: StudySessionSelect<ExtArgs> | null
  }


  /**
   * Model DailyStat
   */

  export type AggregateDailyStat = {
    _count: DailyStatCountAggregateOutputType | null
    _avg: DailyStatAvgAggregateOutputType | null
    _sum: DailyStatSumAggregateOutputType | null
    _min: DailyStatMinAggregateOutputType | null
    _max: DailyStatMaxAggregateOutputType | null
  }

  export type DailyStatAvgAggregateOutputType = {
    minutes: number | null
    newWords: number | null
    reviews: number | null
    correct: number | null
    wrong: number | null
    pomodoros: number | null
    streak: number | null
  }

  export type DailyStatSumAggregateOutputType = {
    minutes: number | null
    newWords: number | null
    reviews: number | null
    correct: number | null
    wrong: number | null
    pomodoros: number | null
    streak: number | null
  }

  export type DailyStatMinAggregateOutputType = {
    date: string | null
    minutes: number | null
    newWords: number | null
    reviews: number | null
    correct: number | null
    wrong: number | null
    pomodoros: number | null
    streak: number | null
    updatedAt: Date | null
  }

  export type DailyStatMaxAggregateOutputType = {
    date: string | null
    minutes: number | null
    newWords: number | null
    reviews: number | null
    correct: number | null
    wrong: number | null
    pomodoros: number | null
    streak: number | null
    updatedAt: Date | null
  }

  export type DailyStatCountAggregateOutputType = {
    date: number
    minutes: number
    newWords: number
    reviews: number
    correct: number
    wrong: number
    pomodoros: number
    streak: number
    updatedAt: number
    _all: number
  }


  export type DailyStatAvgAggregateInputType = {
    minutes?: true
    newWords?: true
    reviews?: true
    correct?: true
    wrong?: true
    pomodoros?: true
    streak?: true
  }

  export type DailyStatSumAggregateInputType = {
    minutes?: true
    newWords?: true
    reviews?: true
    correct?: true
    wrong?: true
    pomodoros?: true
    streak?: true
  }

  export type DailyStatMinAggregateInputType = {
    date?: true
    minutes?: true
    newWords?: true
    reviews?: true
    correct?: true
    wrong?: true
    pomodoros?: true
    streak?: true
    updatedAt?: true
  }

  export type DailyStatMaxAggregateInputType = {
    date?: true
    minutes?: true
    newWords?: true
    reviews?: true
    correct?: true
    wrong?: true
    pomodoros?: true
    streak?: true
    updatedAt?: true
  }

  export type DailyStatCountAggregateInputType = {
    date?: true
    minutes?: true
    newWords?: true
    reviews?: true
    correct?: true
    wrong?: true
    pomodoros?: true
    streak?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyStatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyStat to aggregate.
     */
    where?: DailyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatOrderByWithRelationInput | DailyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyStats
    **/
    _count?: true | DailyStatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyStatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyStatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyStatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyStatMaxAggregateInputType
  }

  export type GetDailyStatAggregateType<T extends DailyStatAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyStat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyStat[P]>
      : GetScalarType<T[P], AggregateDailyStat[P]>
  }




  export type DailyStatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyStatWhereInput
    orderBy?: DailyStatOrderByWithAggregationInput | DailyStatOrderByWithAggregationInput[]
    by: DailyStatScalarFieldEnum[] | DailyStatScalarFieldEnum
    having?: DailyStatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyStatCountAggregateInputType | true
    _avg?: DailyStatAvgAggregateInputType
    _sum?: DailyStatSumAggregateInputType
    _min?: DailyStatMinAggregateInputType
    _max?: DailyStatMaxAggregateInputType
  }

  export type DailyStatGroupByOutputType = {
    date: string
    minutes: number
    newWords: number
    reviews: number
    correct: number
    wrong: number
    pomodoros: number
    streak: number
    updatedAt: Date
    _count: DailyStatCountAggregateOutputType | null
    _avg: DailyStatAvgAggregateOutputType | null
    _sum: DailyStatSumAggregateOutputType | null
    _min: DailyStatMinAggregateOutputType | null
    _max: DailyStatMaxAggregateOutputType | null
  }

  type GetDailyStatGroupByPayload<T extends DailyStatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyStatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyStatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyStatGroupByOutputType[P]>
            : GetScalarType<T[P], DailyStatGroupByOutputType[P]>
        }
      >
    >


  export type DailyStatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    minutes?: boolean
    newWords?: boolean
    reviews?: boolean
    correct?: boolean
    wrong?: boolean
    pomodoros?: boolean
    streak?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyStat"]>

  export type DailyStatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    minutes?: boolean
    newWords?: boolean
    reviews?: boolean
    correct?: boolean
    wrong?: boolean
    pomodoros?: boolean
    streak?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyStat"]>

  export type DailyStatSelectScalar = {
    date?: boolean
    minutes?: boolean
    newWords?: boolean
    reviews?: boolean
    correct?: boolean
    wrong?: boolean
    pomodoros?: boolean
    streak?: boolean
    updatedAt?: boolean
  }


  export type $DailyStatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyStat"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      date: string
      minutes: number
      newWords: number
      reviews: number
      correct: number
      wrong: number
      pomodoros: number
      streak: number
      updatedAt: Date
    }, ExtArgs["result"]["dailyStat"]>
    composites: {}
  }

  type DailyStatGetPayload<S extends boolean | null | undefined | DailyStatDefaultArgs> = $Result.GetResult<Prisma.$DailyStatPayload, S>

  type DailyStatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyStatFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyStatCountAggregateInputType | true
    }

  export interface DailyStatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyStat'], meta: { name: 'DailyStat' } }
    /**
     * Find zero or one DailyStat that matches the filter.
     * @param {DailyStatFindUniqueArgs} args - Arguments to find a DailyStat
     * @example
     * // Get one DailyStat
     * const dailyStat = await prisma.dailyStat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyStatFindUniqueArgs>(args: SelectSubset<T, DailyStatFindUniqueArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyStat that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyStatFindUniqueOrThrowArgs} args - Arguments to find a DailyStat
     * @example
     * // Get one DailyStat
     * const dailyStat = await prisma.dailyStat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyStatFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyStatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyStat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatFindFirstArgs} args - Arguments to find a DailyStat
     * @example
     * // Get one DailyStat
     * const dailyStat = await prisma.dailyStat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyStatFindFirstArgs>(args?: SelectSubset<T, DailyStatFindFirstArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyStat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatFindFirstOrThrowArgs} args - Arguments to find a DailyStat
     * @example
     * // Get one DailyStat
     * const dailyStat = await prisma.dailyStat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyStatFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyStatFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyStats
     * const dailyStats = await prisma.dailyStat.findMany()
     * 
     * // Get first 10 DailyStats
     * const dailyStats = await prisma.dailyStat.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const dailyStatWithDateOnly = await prisma.dailyStat.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends DailyStatFindManyArgs>(args?: SelectSubset<T, DailyStatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyStat.
     * @param {DailyStatCreateArgs} args - Arguments to create a DailyStat.
     * @example
     * // Create one DailyStat
     * const DailyStat = await prisma.dailyStat.create({
     *   data: {
     *     // ... data to create a DailyStat
     *   }
     * })
     * 
     */
    create<T extends DailyStatCreateArgs>(args: SelectSubset<T, DailyStatCreateArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyStats.
     * @param {DailyStatCreateManyArgs} args - Arguments to create many DailyStats.
     * @example
     * // Create many DailyStats
     * const dailyStat = await prisma.dailyStat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyStatCreateManyArgs>(args?: SelectSubset<T, DailyStatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyStats and returns the data saved in the database.
     * @param {DailyStatCreateManyAndReturnArgs} args - Arguments to create many DailyStats.
     * @example
     * // Create many DailyStats
     * const dailyStat = await prisma.dailyStat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyStats and only return the `date`
     * const dailyStatWithDateOnly = await prisma.dailyStat.createManyAndReturn({ 
     *   select: { date: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyStatCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyStatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyStat.
     * @param {DailyStatDeleteArgs} args - Arguments to delete one DailyStat.
     * @example
     * // Delete one DailyStat
     * const DailyStat = await prisma.dailyStat.delete({
     *   where: {
     *     // ... filter to delete one DailyStat
     *   }
     * })
     * 
     */
    delete<T extends DailyStatDeleteArgs>(args: SelectSubset<T, DailyStatDeleteArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyStat.
     * @param {DailyStatUpdateArgs} args - Arguments to update one DailyStat.
     * @example
     * // Update one DailyStat
     * const dailyStat = await prisma.dailyStat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyStatUpdateArgs>(args: SelectSubset<T, DailyStatUpdateArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyStats.
     * @param {DailyStatDeleteManyArgs} args - Arguments to filter DailyStats to delete.
     * @example
     * // Delete a few DailyStats
     * const { count } = await prisma.dailyStat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyStatDeleteManyArgs>(args?: SelectSubset<T, DailyStatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyStats
     * const dailyStat = await prisma.dailyStat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyStatUpdateManyArgs>(args: SelectSubset<T, DailyStatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyStat.
     * @param {DailyStatUpsertArgs} args - Arguments to update or create a DailyStat.
     * @example
     * // Update or create a DailyStat
     * const dailyStat = await prisma.dailyStat.upsert({
     *   create: {
     *     // ... data to create a DailyStat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyStat we want to update
     *   }
     * })
     */
    upsert<T extends DailyStatUpsertArgs>(args: SelectSubset<T, DailyStatUpsertArgs<ExtArgs>>): Prisma__DailyStatClient<$Result.GetResult<Prisma.$DailyStatPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatCountArgs} args - Arguments to filter DailyStats to count.
     * @example
     * // Count the number of DailyStats
     * const count = await prisma.dailyStat.count({
     *   where: {
     *     // ... the filter for the DailyStats we want to count
     *   }
     * })
    **/
    count<T extends DailyStatCountArgs>(
      args?: Subset<T, DailyStatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyStatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyStatAggregateArgs>(args: Subset<T, DailyStatAggregateArgs>): Prisma.PrismaPromise<GetDailyStatAggregateType<T>>

    /**
     * Group by DailyStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyStatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyStatGroupByArgs['orderBy'] }
        : { orderBy?: DailyStatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyStatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyStatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyStat model
   */
  readonly fields: DailyStatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyStat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyStatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyStat model
   */ 
  interface DailyStatFieldRefs {
    readonly date: FieldRef<"DailyStat", 'String'>
    readonly minutes: FieldRef<"DailyStat", 'Int'>
    readonly newWords: FieldRef<"DailyStat", 'Int'>
    readonly reviews: FieldRef<"DailyStat", 'Int'>
    readonly correct: FieldRef<"DailyStat", 'Int'>
    readonly wrong: FieldRef<"DailyStat", 'Int'>
    readonly pomodoros: FieldRef<"DailyStat", 'Int'>
    readonly streak: FieldRef<"DailyStat", 'Int'>
    readonly updatedAt: FieldRef<"DailyStat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyStat findUnique
   */
  export type DailyStatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * Filter, which DailyStat to fetch.
     */
    where: DailyStatWhereUniqueInput
  }

  /**
   * DailyStat findUniqueOrThrow
   */
  export type DailyStatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * Filter, which DailyStat to fetch.
     */
    where: DailyStatWhereUniqueInput
  }

  /**
   * DailyStat findFirst
   */
  export type DailyStatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * Filter, which DailyStat to fetch.
     */
    where?: DailyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatOrderByWithRelationInput | DailyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyStats.
     */
    cursor?: DailyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyStats.
     */
    distinct?: DailyStatScalarFieldEnum | DailyStatScalarFieldEnum[]
  }

  /**
   * DailyStat findFirstOrThrow
   */
  export type DailyStatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * Filter, which DailyStat to fetch.
     */
    where?: DailyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatOrderByWithRelationInput | DailyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyStats.
     */
    cursor?: DailyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyStats.
     */
    distinct?: DailyStatScalarFieldEnum | DailyStatScalarFieldEnum[]
  }

  /**
   * DailyStat findMany
   */
  export type DailyStatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * Filter, which DailyStats to fetch.
     */
    where?: DailyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatOrderByWithRelationInput | DailyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyStats.
     */
    cursor?: DailyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    distinct?: DailyStatScalarFieldEnum | DailyStatScalarFieldEnum[]
  }

  /**
   * DailyStat create
   */
  export type DailyStatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * The data needed to create a DailyStat.
     */
    data: XOR<DailyStatCreateInput, DailyStatUncheckedCreateInput>
  }

  /**
   * DailyStat createMany
   */
  export type DailyStatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyStats.
     */
    data: DailyStatCreateManyInput | DailyStatCreateManyInput[]
  }

  /**
   * DailyStat createManyAndReturn
   */
  export type DailyStatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyStats.
     */
    data: DailyStatCreateManyInput | DailyStatCreateManyInput[]
  }

  /**
   * DailyStat update
   */
  export type DailyStatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * The data needed to update a DailyStat.
     */
    data: XOR<DailyStatUpdateInput, DailyStatUncheckedUpdateInput>
    /**
     * Choose, which DailyStat to update.
     */
    where: DailyStatWhereUniqueInput
  }

  /**
   * DailyStat updateMany
   */
  export type DailyStatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyStats.
     */
    data: XOR<DailyStatUpdateManyMutationInput, DailyStatUncheckedUpdateManyInput>
    /**
     * Filter which DailyStats to update
     */
    where?: DailyStatWhereInput
  }

  /**
   * DailyStat upsert
   */
  export type DailyStatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * The filter to search for the DailyStat to update in case it exists.
     */
    where: DailyStatWhereUniqueInput
    /**
     * In case the DailyStat found by the `where` argument doesn't exist, create a new DailyStat with this data.
     */
    create: XOR<DailyStatCreateInput, DailyStatUncheckedCreateInput>
    /**
     * In case the DailyStat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyStatUpdateInput, DailyStatUncheckedUpdateInput>
  }

  /**
   * DailyStat delete
   */
  export type DailyStatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
    /**
     * Filter which DailyStat to delete.
     */
    where: DailyStatWhereUniqueInput
  }

  /**
   * DailyStat deleteMany
   */
  export type DailyStatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyStats to delete
     */
    where?: DailyStatWhereInput
  }

  /**
   * DailyStat without action
   */
  export type DailyStatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStat
     */
    select?: DailyStatSelect<ExtArgs> | null
  }


  /**
   * Model ListeningDrill
   */

  export type AggregateListeningDrill = {
    _count: ListeningDrillCountAggregateOutputType | null
    _avg: ListeningDrillAvgAggregateOutputType | null
    _sum: ListeningDrillSumAggregateOutputType | null
    _min: ListeningDrillMinAggregateOutputType | null
    _max: ListeningDrillMaxAggregateOutputType | null
  }

  export type ListeningDrillAvgAggregateOutputType = {
    accuracy: number | null
  }

  export type ListeningDrillSumAggregateOutputType = {
    accuracy: number | null
  }

  export type ListeningDrillMinAggregateOutputType = {
    id: string | null
    title: string | null
    source: string | null
    refId: string | null
    audioPath: string | null
    sentences: string | null
    dictation: string | null
    accuracy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListeningDrillMaxAggregateOutputType = {
    id: string | null
    title: string | null
    source: string | null
    refId: string | null
    audioPath: string | null
    sentences: string | null
    dictation: string | null
    accuracy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListeningDrillCountAggregateOutputType = {
    id: number
    title: number
    source: number
    refId: number
    audioPath: number
    sentences: number
    dictation: number
    accuracy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ListeningDrillAvgAggregateInputType = {
    accuracy?: true
  }

  export type ListeningDrillSumAggregateInputType = {
    accuracy?: true
  }

  export type ListeningDrillMinAggregateInputType = {
    id?: true
    title?: true
    source?: true
    refId?: true
    audioPath?: true
    sentences?: true
    dictation?: true
    accuracy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListeningDrillMaxAggregateInputType = {
    id?: true
    title?: true
    source?: true
    refId?: true
    audioPath?: true
    sentences?: true
    dictation?: true
    accuracy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListeningDrillCountAggregateInputType = {
    id?: true
    title?: true
    source?: true
    refId?: true
    audioPath?: true
    sentences?: true
    dictation?: true
    accuracy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ListeningDrillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListeningDrill to aggregate.
     */
    where?: ListeningDrillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningDrills to fetch.
     */
    orderBy?: ListeningDrillOrderByWithRelationInput | ListeningDrillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListeningDrillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningDrills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningDrills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListeningDrills
    **/
    _count?: true | ListeningDrillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListeningDrillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListeningDrillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListeningDrillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListeningDrillMaxAggregateInputType
  }

  export type GetListeningDrillAggregateType<T extends ListeningDrillAggregateArgs> = {
        [P in keyof T & keyof AggregateListeningDrill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListeningDrill[P]>
      : GetScalarType<T[P], AggregateListeningDrill[P]>
  }




  export type ListeningDrillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListeningDrillWhereInput
    orderBy?: ListeningDrillOrderByWithAggregationInput | ListeningDrillOrderByWithAggregationInput[]
    by: ListeningDrillScalarFieldEnum[] | ListeningDrillScalarFieldEnum
    having?: ListeningDrillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListeningDrillCountAggregateInputType | true
    _avg?: ListeningDrillAvgAggregateInputType
    _sum?: ListeningDrillSumAggregateInputType
    _min?: ListeningDrillMinAggregateInputType
    _max?: ListeningDrillMaxAggregateInputType
  }

  export type ListeningDrillGroupByOutputType = {
    id: string
    title: string
    source: string
    refId: string | null
    audioPath: string | null
    sentences: string
    dictation: string | null
    accuracy: number | null
    createdAt: Date
    updatedAt: Date
    _count: ListeningDrillCountAggregateOutputType | null
    _avg: ListeningDrillAvgAggregateOutputType | null
    _sum: ListeningDrillSumAggregateOutputType | null
    _min: ListeningDrillMinAggregateOutputType | null
    _max: ListeningDrillMaxAggregateOutputType | null
  }

  type GetListeningDrillGroupByPayload<T extends ListeningDrillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListeningDrillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListeningDrillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListeningDrillGroupByOutputType[P]>
            : GetScalarType<T[P], ListeningDrillGroupByOutputType[P]>
        }
      >
    >


  export type ListeningDrillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    source?: boolean
    refId?: boolean
    audioPath?: boolean
    sentences?: boolean
    dictation?: boolean
    accuracy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["listeningDrill"]>

  export type ListeningDrillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    source?: boolean
    refId?: boolean
    audioPath?: boolean
    sentences?: boolean
    dictation?: boolean
    accuracy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["listeningDrill"]>

  export type ListeningDrillSelectScalar = {
    id?: boolean
    title?: boolean
    source?: boolean
    refId?: boolean
    audioPath?: boolean
    sentences?: boolean
    dictation?: boolean
    accuracy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ListeningDrillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListeningDrill"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      source: string
      refId: string | null
      audioPath: string | null
      sentences: string
      dictation: string | null
      accuracy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["listeningDrill"]>
    composites: {}
  }

  type ListeningDrillGetPayload<S extends boolean | null | undefined | ListeningDrillDefaultArgs> = $Result.GetResult<Prisma.$ListeningDrillPayload, S>

  type ListeningDrillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListeningDrillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListeningDrillCountAggregateInputType | true
    }

  export interface ListeningDrillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListeningDrill'], meta: { name: 'ListeningDrill' } }
    /**
     * Find zero or one ListeningDrill that matches the filter.
     * @param {ListeningDrillFindUniqueArgs} args - Arguments to find a ListeningDrill
     * @example
     * // Get one ListeningDrill
     * const listeningDrill = await prisma.listeningDrill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListeningDrillFindUniqueArgs>(args: SelectSubset<T, ListeningDrillFindUniqueArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ListeningDrill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListeningDrillFindUniqueOrThrowArgs} args - Arguments to find a ListeningDrill
     * @example
     * // Get one ListeningDrill
     * const listeningDrill = await prisma.listeningDrill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListeningDrillFindUniqueOrThrowArgs>(args: SelectSubset<T, ListeningDrillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ListeningDrill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillFindFirstArgs} args - Arguments to find a ListeningDrill
     * @example
     * // Get one ListeningDrill
     * const listeningDrill = await prisma.listeningDrill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListeningDrillFindFirstArgs>(args?: SelectSubset<T, ListeningDrillFindFirstArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ListeningDrill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillFindFirstOrThrowArgs} args - Arguments to find a ListeningDrill
     * @example
     * // Get one ListeningDrill
     * const listeningDrill = await prisma.listeningDrill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListeningDrillFindFirstOrThrowArgs>(args?: SelectSubset<T, ListeningDrillFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ListeningDrills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListeningDrills
     * const listeningDrills = await prisma.listeningDrill.findMany()
     * 
     * // Get first 10 ListeningDrills
     * const listeningDrills = await prisma.listeningDrill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listeningDrillWithIdOnly = await prisma.listeningDrill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListeningDrillFindManyArgs>(args?: SelectSubset<T, ListeningDrillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ListeningDrill.
     * @param {ListeningDrillCreateArgs} args - Arguments to create a ListeningDrill.
     * @example
     * // Create one ListeningDrill
     * const ListeningDrill = await prisma.listeningDrill.create({
     *   data: {
     *     // ... data to create a ListeningDrill
     *   }
     * })
     * 
     */
    create<T extends ListeningDrillCreateArgs>(args: SelectSubset<T, ListeningDrillCreateArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ListeningDrills.
     * @param {ListeningDrillCreateManyArgs} args - Arguments to create many ListeningDrills.
     * @example
     * // Create many ListeningDrills
     * const listeningDrill = await prisma.listeningDrill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListeningDrillCreateManyArgs>(args?: SelectSubset<T, ListeningDrillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListeningDrills and returns the data saved in the database.
     * @param {ListeningDrillCreateManyAndReturnArgs} args - Arguments to create many ListeningDrills.
     * @example
     * // Create many ListeningDrills
     * const listeningDrill = await prisma.listeningDrill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListeningDrills and only return the `id`
     * const listeningDrillWithIdOnly = await prisma.listeningDrill.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListeningDrillCreateManyAndReturnArgs>(args?: SelectSubset<T, ListeningDrillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ListeningDrill.
     * @param {ListeningDrillDeleteArgs} args - Arguments to delete one ListeningDrill.
     * @example
     * // Delete one ListeningDrill
     * const ListeningDrill = await prisma.listeningDrill.delete({
     *   where: {
     *     // ... filter to delete one ListeningDrill
     *   }
     * })
     * 
     */
    delete<T extends ListeningDrillDeleteArgs>(args: SelectSubset<T, ListeningDrillDeleteArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ListeningDrill.
     * @param {ListeningDrillUpdateArgs} args - Arguments to update one ListeningDrill.
     * @example
     * // Update one ListeningDrill
     * const listeningDrill = await prisma.listeningDrill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListeningDrillUpdateArgs>(args: SelectSubset<T, ListeningDrillUpdateArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ListeningDrills.
     * @param {ListeningDrillDeleteManyArgs} args - Arguments to filter ListeningDrills to delete.
     * @example
     * // Delete a few ListeningDrills
     * const { count } = await prisma.listeningDrill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListeningDrillDeleteManyArgs>(args?: SelectSubset<T, ListeningDrillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListeningDrills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListeningDrills
     * const listeningDrill = await prisma.listeningDrill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListeningDrillUpdateManyArgs>(args: SelectSubset<T, ListeningDrillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ListeningDrill.
     * @param {ListeningDrillUpsertArgs} args - Arguments to update or create a ListeningDrill.
     * @example
     * // Update or create a ListeningDrill
     * const listeningDrill = await prisma.listeningDrill.upsert({
     *   create: {
     *     // ... data to create a ListeningDrill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListeningDrill we want to update
     *   }
     * })
     */
    upsert<T extends ListeningDrillUpsertArgs>(args: SelectSubset<T, ListeningDrillUpsertArgs<ExtArgs>>): Prisma__ListeningDrillClient<$Result.GetResult<Prisma.$ListeningDrillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ListeningDrills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillCountArgs} args - Arguments to filter ListeningDrills to count.
     * @example
     * // Count the number of ListeningDrills
     * const count = await prisma.listeningDrill.count({
     *   where: {
     *     // ... the filter for the ListeningDrills we want to count
     *   }
     * })
    **/
    count<T extends ListeningDrillCountArgs>(
      args?: Subset<T, ListeningDrillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListeningDrillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListeningDrill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListeningDrillAggregateArgs>(args: Subset<T, ListeningDrillAggregateArgs>): Prisma.PrismaPromise<GetListeningDrillAggregateType<T>>

    /**
     * Group by ListeningDrill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningDrillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListeningDrillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListeningDrillGroupByArgs['orderBy'] }
        : { orderBy?: ListeningDrillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListeningDrillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListeningDrillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListeningDrill model
   */
  readonly fields: ListeningDrillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListeningDrill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListeningDrillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListeningDrill model
   */ 
  interface ListeningDrillFieldRefs {
    readonly id: FieldRef<"ListeningDrill", 'String'>
    readonly title: FieldRef<"ListeningDrill", 'String'>
    readonly source: FieldRef<"ListeningDrill", 'String'>
    readonly refId: FieldRef<"ListeningDrill", 'String'>
    readonly audioPath: FieldRef<"ListeningDrill", 'String'>
    readonly sentences: FieldRef<"ListeningDrill", 'String'>
    readonly dictation: FieldRef<"ListeningDrill", 'String'>
    readonly accuracy: FieldRef<"ListeningDrill", 'Float'>
    readonly createdAt: FieldRef<"ListeningDrill", 'DateTime'>
    readonly updatedAt: FieldRef<"ListeningDrill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListeningDrill findUnique
   */
  export type ListeningDrillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * Filter, which ListeningDrill to fetch.
     */
    where: ListeningDrillWhereUniqueInput
  }

  /**
   * ListeningDrill findUniqueOrThrow
   */
  export type ListeningDrillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * Filter, which ListeningDrill to fetch.
     */
    where: ListeningDrillWhereUniqueInput
  }

  /**
   * ListeningDrill findFirst
   */
  export type ListeningDrillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * Filter, which ListeningDrill to fetch.
     */
    where?: ListeningDrillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningDrills to fetch.
     */
    orderBy?: ListeningDrillOrderByWithRelationInput | ListeningDrillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListeningDrills.
     */
    cursor?: ListeningDrillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningDrills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningDrills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListeningDrills.
     */
    distinct?: ListeningDrillScalarFieldEnum | ListeningDrillScalarFieldEnum[]
  }

  /**
   * ListeningDrill findFirstOrThrow
   */
  export type ListeningDrillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * Filter, which ListeningDrill to fetch.
     */
    where?: ListeningDrillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningDrills to fetch.
     */
    orderBy?: ListeningDrillOrderByWithRelationInput | ListeningDrillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListeningDrills.
     */
    cursor?: ListeningDrillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningDrills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningDrills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListeningDrills.
     */
    distinct?: ListeningDrillScalarFieldEnum | ListeningDrillScalarFieldEnum[]
  }

  /**
   * ListeningDrill findMany
   */
  export type ListeningDrillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * Filter, which ListeningDrills to fetch.
     */
    where?: ListeningDrillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningDrills to fetch.
     */
    orderBy?: ListeningDrillOrderByWithRelationInput | ListeningDrillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListeningDrills.
     */
    cursor?: ListeningDrillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningDrills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningDrills.
     */
    skip?: number
    distinct?: ListeningDrillScalarFieldEnum | ListeningDrillScalarFieldEnum[]
  }

  /**
   * ListeningDrill create
   */
  export type ListeningDrillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * The data needed to create a ListeningDrill.
     */
    data: XOR<ListeningDrillCreateInput, ListeningDrillUncheckedCreateInput>
  }

  /**
   * ListeningDrill createMany
   */
  export type ListeningDrillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListeningDrills.
     */
    data: ListeningDrillCreateManyInput | ListeningDrillCreateManyInput[]
  }

  /**
   * ListeningDrill createManyAndReturn
   */
  export type ListeningDrillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ListeningDrills.
     */
    data: ListeningDrillCreateManyInput | ListeningDrillCreateManyInput[]
  }

  /**
   * ListeningDrill update
   */
  export type ListeningDrillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * The data needed to update a ListeningDrill.
     */
    data: XOR<ListeningDrillUpdateInput, ListeningDrillUncheckedUpdateInput>
    /**
     * Choose, which ListeningDrill to update.
     */
    where: ListeningDrillWhereUniqueInput
  }

  /**
   * ListeningDrill updateMany
   */
  export type ListeningDrillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListeningDrills.
     */
    data: XOR<ListeningDrillUpdateManyMutationInput, ListeningDrillUncheckedUpdateManyInput>
    /**
     * Filter which ListeningDrills to update
     */
    where?: ListeningDrillWhereInput
  }

  /**
   * ListeningDrill upsert
   */
  export type ListeningDrillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * The filter to search for the ListeningDrill to update in case it exists.
     */
    where: ListeningDrillWhereUniqueInput
    /**
     * In case the ListeningDrill found by the `where` argument doesn't exist, create a new ListeningDrill with this data.
     */
    create: XOR<ListeningDrillCreateInput, ListeningDrillUncheckedCreateInput>
    /**
     * In case the ListeningDrill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListeningDrillUpdateInput, ListeningDrillUncheckedUpdateInput>
  }

  /**
   * ListeningDrill delete
   */
  export type ListeningDrillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
    /**
     * Filter which ListeningDrill to delete.
     */
    where: ListeningDrillWhereUniqueInput
  }

  /**
   * ListeningDrill deleteMany
   */
  export type ListeningDrillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListeningDrills to delete
     */
    where?: ListeningDrillWhereInput
  }

  /**
   * ListeningDrill without action
   */
  export type ListeningDrillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningDrill
     */
    select?: ListeningDrillSelect<ExtArgs> | null
  }


  /**
   * Model WritingTemplate
   */

  export type AggregateWritingTemplate = {
    _count: WritingTemplateCountAggregateOutputType | null
    _avg: WritingTemplateAvgAggregateOutputType | null
    _sum: WritingTemplateSumAggregateOutputType | null
    _min: WritingTemplateMinAggregateOutputType | null
    _max: WritingTemplateMaxAggregateOutputType | null
  }

  export type WritingTemplateAvgAggregateOutputType = {
    sort: number | null
  }

  export type WritingTemplateSumAggregateOutputType = {
    sort: number | null
  }

  export type WritingTemplateMinAggregateOutputType = {
    id: string | null
    category: string | null
    title: string | null
    summary: string | null
    body: string | null
    phrases: string | null
    starred: boolean | null
    sort: number | null
  }

  export type WritingTemplateMaxAggregateOutputType = {
    id: string | null
    category: string | null
    title: string | null
    summary: string | null
    body: string | null
    phrases: string | null
    starred: boolean | null
    sort: number | null
  }

  export type WritingTemplateCountAggregateOutputType = {
    id: number
    category: number
    title: number
    summary: number
    body: number
    phrases: number
    starred: number
    sort: number
    _all: number
  }


  export type WritingTemplateAvgAggregateInputType = {
    sort?: true
  }

  export type WritingTemplateSumAggregateInputType = {
    sort?: true
  }

  export type WritingTemplateMinAggregateInputType = {
    id?: true
    category?: true
    title?: true
    summary?: true
    body?: true
    phrases?: true
    starred?: true
    sort?: true
  }

  export type WritingTemplateMaxAggregateInputType = {
    id?: true
    category?: true
    title?: true
    summary?: true
    body?: true
    phrases?: true
    starred?: true
    sort?: true
  }

  export type WritingTemplateCountAggregateInputType = {
    id?: true
    category?: true
    title?: true
    summary?: true
    body?: true
    phrases?: true
    starred?: true
    sort?: true
    _all?: true
  }

  export type WritingTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WritingTemplate to aggregate.
     */
    where?: WritingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WritingTemplates to fetch.
     */
    orderBy?: WritingTemplateOrderByWithRelationInput | WritingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WritingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WritingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WritingTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WritingTemplates
    **/
    _count?: true | WritingTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WritingTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WritingTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WritingTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WritingTemplateMaxAggregateInputType
  }

  export type GetWritingTemplateAggregateType<T extends WritingTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateWritingTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWritingTemplate[P]>
      : GetScalarType<T[P], AggregateWritingTemplate[P]>
  }




  export type WritingTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WritingTemplateWhereInput
    orderBy?: WritingTemplateOrderByWithAggregationInput | WritingTemplateOrderByWithAggregationInput[]
    by: WritingTemplateScalarFieldEnum[] | WritingTemplateScalarFieldEnum
    having?: WritingTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WritingTemplateCountAggregateInputType | true
    _avg?: WritingTemplateAvgAggregateInputType
    _sum?: WritingTemplateSumAggregateInputType
    _min?: WritingTemplateMinAggregateInputType
    _max?: WritingTemplateMaxAggregateInputType
  }

  export type WritingTemplateGroupByOutputType = {
    id: string
    category: string
    title: string
    summary: string
    body: string
    phrases: string
    starred: boolean
    sort: number
    _count: WritingTemplateCountAggregateOutputType | null
    _avg: WritingTemplateAvgAggregateOutputType | null
    _sum: WritingTemplateSumAggregateOutputType | null
    _min: WritingTemplateMinAggregateOutputType | null
    _max: WritingTemplateMaxAggregateOutputType | null
  }

  type GetWritingTemplateGroupByPayload<T extends WritingTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WritingTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WritingTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WritingTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], WritingTemplateGroupByOutputType[P]>
        }
      >
    >


  export type WritingTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    summary?: boolean
    body?: boolean
    phrases?: boolean
    starred?: boolean
    sort?: boolean
  }, ExtArgs["result"]["writingTemplate"]>

  export type WritingTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    summary?: boolean
    body?: boolean
    phrases?: boolean
    starred?: boolean
    sort?: boolean
  }, ExtArgs["result"]["writingTemplate"]>

  export type WritingTemplateSelectScalar = {
    id?: boolean
    category?: boolean
    title?: boolean
    summary?: boolean
    body?: boolean
    phrases?: boolean
    starred?: boolean
    sort?: boolean
  }


  export type $WritingTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WritingTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      title: string
      summary: string
      body: string
      phrases: string
      starred: boolean
      sort: number
    }, ExtArgs["result"]["writingTemplate"]>
    composites: {}
  }

  type WritingTemplateGetPayload<S extends boolean | null | undefined | WritingTemplateDefaultArgs> = $Result.GetResult<Prisma.$WritingTemplatePayload, S>

  type WritingTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WritingTemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WritingTemplateCountAggregateInputType | true
    }

  export interface WritingTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WritingTemplate'], meta: { name: 'WritingTemplate' } }
    /**
     * Find zero or one WritingTemplate that matches the filter.
     * @param {WritingTemplateFindUniqueArgs} args - Arguments to find a WritingTemplate
     * @example
     * // Get one WritingTemplate
     * const writingTemplate = await prisma.writingTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WritingTemplateFindUniqueArgs>(args: SelectSubset<T, WritingTemplateFindUniqueArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WritingTemplate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WritingTemplateFindUniqueOrThrowArgs} args - Arguments to find a WritingTemplate
     * @example
     * // Get one WritingTemplate
     * const writingTemplate = await prisma.writingTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WritingTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, WritingTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WritingTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateFindFirstArgs} args - Arguments to find a WritingTemplate
     * @example
     * // Get one WritingTemplate
     * const writingTemplate = await prisma.writingTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WritingTemplateFindFirstArgs>(args?: SelectSubset<T, WritingTemplateFindFirstArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WritingTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateFindFirstOrThrowArgs} args - Arguments to find a WritingTemplate
     * @example
     * // Get one WritingTemplate
     * const writingTemplate = await prisma.writingTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WritingTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, WritingTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WritingTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WritingTemplates
     * const writingTemplates = await prisma.writingTemplate.findMany()
     * 
     * // Get first 10 WritingTemplates
     * const writingTemplates = await prisma.writingTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const writingTemplateWithIdOnly = await prisma.writingTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WritingTemplateFindManyArgs>(args?: SelectSubset<T, WritingTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WritingTemplate.
     * @param {WritingTemplateCreateArgs} args - Arguments to create a WritingTemplate.
     * @example
     * // Create one WritingTemplate
     * const WritingTemplate = await prisma.writingTemplate.create({
     *   data: {
     *     // ... data to create a WritingTemplate
     *   }
     * })
     * 
     */
    create<T extends WritingTemplateCreateArgs>(args: SelectSubset<T, WritingTemplateCreateArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WritingTemplates.
     * @param {WritingTemplateCreateManyArgs} args - Arguments to create many WritingTemplates.
     * @example
     * // Create many WritingTemplates
     * const writingTemplate = await prisma.writingTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WritingTemplateCreateManyArgs>(args?: SelectSubset<T, WritingTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WritingTemplates and returns the data saved in the database.
     * @param {WritingTemplateCreateManyAndReturnArgs} args - Arguments to create many WritingTemplates.
     * @example
     * // Create many WritingTemplates
     * const writingTemplate = await prisma.writingTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WritingTemplates and only return the `id`
     * const writingTemplateWithIdOnly = await prisma.writingTemplate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WritingTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, WritingTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WritingTemplate.
     * @param {WritingTemplateDeleteArgs} args - Arguments to delete one WritingTemplate.
     * @example
     * // Delete one WritingTemplate
     * const WritingTemplate = await prisma.writingTemplate.delete({
     *   where: {
     *     // ... filter to delete one WritingTemplate
     *   }
     * })
     * 
     */
    delete<T extends WritingTemplateDeleteArgs>(args: SelectSubset<T, WritingTemplateDeleteArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WritingTemplate.
     * @param {WritingTemplateUpdateArgs} args - Arguments to update one WritingTemplate.
     * @example
     * // Update one WritingTemplate
     * const writingTemplate = await prisma.writingTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WritingTemplateUpdateArgs>(args: SelectSubset<T, WritingTemplateUpdateArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WritingTemplates.
     * @param {WritingTemplateDeleteManyArgs} args - Arguments to filter WritingTemplates to delete.
     * @example
     * // Delete a few WritingTemplates
     * const { count } = await prisma.writingTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WritingTemplateDeleteManyArgs>(args?: SelectSubset<T, WritingTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WritingTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WritingTemplates
     * const writingTemplate = await prisma.writingTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WritingTemplateUpdateManyArgs>(args: SelectSubset<T, WritingTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WritingTemplate.
     * @param {WritingTemplateUpsertArgs} args - Arguments to update or create a WritingTemplate.
     * @example
     * // Update or create a WritingTemplate
     * const writingTemplate = await prisma.writingTemplate.upsert({
     *   create: {
     *     // ... data to create a WritingTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WritingTemplate we want to update
     *   }
     * })
     */
    upsert<T extends WritingTemplateUpsertArgs>(args: SelectSubset<T, WritingTemplateUpsertArgs<ExtArgs>>): Prisma__WritingTemplateClient<$Result.GetResult<Prisma.$WritingTemplatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WritingTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateCountArgs} args - Arguments to filter WritingTemplates to count.
     * @example
     * // Count the number of WritingTemplates
     * const count = await prisma.writingTemplate.count({
     *   where: {
     *     // ... the filter for the WritingTemplates we want to count
     *   }
     * })
    **/
    count<T extends WritingTemplateCountArgs>(
      args?: Subset<T, WritingTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WritingTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WritingTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WritingTemplateAggregateArgs>(args: Subset<T, WritingTemplateAggregateArgs>): Prisma.PrismaPromise<GetWritingTemplateAggregateType<T>>

    /**
     * Group by WritingTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WritingTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WritingTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WritingTemplateGroupByArgs['orderBy'] }
        : { orderBy?: WritingTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WritingTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWritingTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WritingTemplate model
   */
  readonly fields: WritingTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WritingTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WritingTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WritingTemplate model
   */ 
  interface WritingTemplateFieldRefs {
    readonly id: FieldRef<"WritingTemplate", 'String'>
    readonly category: FieldRef<"WritingTemplate", 'String'>
    readonly title: FieldRef<"WritingTemplate", 'String'>
    readonly summary: FieldRef<"WritingTemplate", 'String'>
    readonly body: FieldRef<"WritingTemplate", 'String'>
    readonly phrases: FieldRef<"WritingTemplate", 'String'>
    readonly starred: FieldRef<"WritingTemplate", 'Boolean'>
    readonly sort: FieldRef<"WritingTemplate", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * WritingTemplate findUnique
   */
  export type WritingTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WritingTemplate to fetch.
     */
    where: WritingTemplateWhereUniqueInput
  }

  /**
   * WritingTemplate findUniqueOrThrow
   */
  export type WritingTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WritingTemplate to fetch.
     */
    where: WritingTemplateWhereUniqueInput
  }

  /**
   * WritingTemplate findFirst
   */
  export type WritingTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WritingTemplate to fetch.
     */
    where?: WritingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WritingTemplates to fetch.
     */
    orderBy?: WritingTemplateOrderByWithRelationInput | WritingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WritingTemplates.
     */
    cursor?: WritingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WritingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WritingTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WritingTemplates.
     */
    distinct?: WritingTemplateScalarFieldEnum | WritingTemplateScalarFieldEnum[]
  }

  /**
   * WritingTemplate findFirstOrThrow
   */
  export type WritingTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WritingTemplate to fetch.
     */
    where?: WritingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WritingTemplates to fetch.
     */
    orderBy?: WritingTemplateOrderByWithRelationInput | WritingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WritingTemplates.
     */
    cursor?: WritingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WritingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WritingTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WritingTemplates.
     */
    distinct?: WritingTemplateScalarFieldEnum | WritingTemplateScalarFieldEnum[]
  }

  /**
   * WritingTemplate findMany
   */
  export type WritingTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WritingTemplates to fetch.
     */
    where?: WritingTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WritingTemplates to fetch.
     */
    orderBy?: WritingTemplateOrderByWithRelationInput | WritingTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WritingTemplates.
     */
    cursor?: WritingTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WritingTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WritingTemplates.
     */
    skip?: number
    distinct?: WritingTemplateScalarFieldEnum | WritingTemplateScalarFieldEnum[]
  }

  /**
   * WritingTemplate create
   */
  export type WritingTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * The data needed to create a WritingTemplate.
     */
    data: XOR<WritingTemplateCreateInput, WritingTemplateUncheckedCreateInput>
  }

  /**
   * WritingTemplate createMany
   */
  export type WritingTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WritingTemplates.
     */
    data: WritingTemplateCreateManyInput | WritingTemplateCreateManyInput[]
  }

  /**
   * WritingTemplate createManyAndReturn
   */
  export type WritingTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WritingTemplates.
     */
    data: WritingTemplateCreateManyInput | WritingTemplateCreateManyInput[]
  }

  /**
   * WritingTemplate update
   */
  export type WritingTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * The data needed to update a WritingTemplate.
     */
    data: XOR<WritingTemplateUpdateInput, WritingTemplateUncheckedUpdateInput>
    /**
     * Choose, which WritingTemplate to update.
     */
    where: WritingTemplateWhereUniqueInput
  }

  /**
   * WritingTemplate updateMany
   */
  export type WritingTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WritingTemplates.
     */
    data: XOR<WritingTemplateUpdateManyMutationInput, WritingTemplateUncheckedUpdateManyInput>
    /**
     * Filter which WritingTemplates to update
     */
    where?: WritingTemplateWhereInput
  }

  /**
   * WritingTemplate upsert
   */
  export type WritingTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * The filter to search for the WritingTemplate to update in case it exists.
     */
    where: WritingTemplateWhereUniqueInput
    /**
     * In case the WritingTemplate found by the `where` argument doesn't exist, create a new WritingTemplate with this data.
     */
    create: XOR<WritingTemplateCreateInput, WritingTemplateUncheckedCreateInput>
    /**
     * In case the WritingTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WritingTemplateUpdateInput, WritingTemplateUncheckedUpdateInput>
  }

  /**
   * WritingTemplate delete
   */
  export type WritingTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
    /**
     * Filter which WritingTemplate to delete.
     */
    where: WritingTemplateWhereUniqueInput
  }

  /**
   * WritingTemplate deleteMany
   */
  export type WritingTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WritingTemplates to delete
     */
    where?: WritingTemplateWhereInput
  }

  /**
   * WritingTemplate without action
   */
  export type WritingTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WritingTemplate
     */
    select?: WritingTemplateSelect<ExtArgs> | null
  }


  /**
   * Model Paper
   */

  export type AggregatePaper = {
    _count: PaperCountAggregateOutputType | null
    _avg: PaperAvgAggregateOutputType | null
    _sum: PaperSumAggregateOutputType | null
    _min: PaperMinAggregateOutputType | null
    _max: PaperMaxAggregateOutputType | null
  }

  export type PaperAvgAggregateOutputType = {
    year: number | null
    month: number | null
    questionCount: number | null
  }

  export type PaperSumAggregateOutputType = {
    year: number | null
    month: number | null
    questionCount: number | null
  }

  export type PaperMinAggregateOutputType = {
    id: string | null
    slug: string | null
    year: number | null
    month: number | null
    set: string | null
    label: string | null
    writing: string | null
    writingModel: string | null
    writingModelZh: string | null
    translation: string | null
    translationReference: string | null
    subjective: string | null
    passages: string | null
    questions: string | null
    byPart: string | null
    questionCount: number | null
    audioUrl: string | null
    audioHls: string | null
    audioPieces: string | null
    listenedAt: Date | null
    source: string | null
    createdAt: Date | null
  }

  export type PaperMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    year: number | null
    month: number | null
    set: string | null
    label: string | null
    writing: string | null
    writingModel: string | null
    writingModelZh: string | null
    translation: string | null
    translationReference: string | null
    subjective: string | null
    passages: string | null
    questions: string | null
    byPart: string | null
    questionCount: number | null
    audioUrl: string | null
    audioHls: string | null
    audioPieces: string | null
    listenedAt: Date | null
    source: string | null
    createdAt: Date | null
  }

  export type PaperCountAggregateOutputType = {
    id: number
    slug: number
    year: number
    month: number
    set: number
    label: number
    writing: number
    writingModel: number
    writingModelZh: number
    translation: number
    translationReference: number
    subjective: number
    passages: number
    questions: number
    byPart: number
    questionCount: number
    audioUrl: number
    audioHls: number
    audioPieces: number
    listenedAt: number
    source: number
    createdAt: number
    _all: number
  }


  export type PaperAvgAggregateInputType = {
    year?: true
    month?: true
    questionCount?: true
  }

  export type PaperSumAggregateInputType = {
    year?: true
    month?: true
    questionCount?: true
  }

  export type PaperMinAggregateInputType = {
    id?: true
    slug?: true
    year?: true
    month?: true
    set?: true
    label?: true
    writing?: true
    writingModel?: true
    writingModelZh?: true
    translation?: true
    translationReference?: true
    subjective?: true
    passages?: true
    questions?: true
    byPart?: true
    questionCount?: true
    audioUrl?: true
    audioHls?: true
    audioPieces?: true
    listenedAt?: true
    source?: true
    createdAt?: true
  }

  export type PaperMaxAggregateInputType = {
    id?: true
    slug?: true
    year?: true
    month?: true
    set?: true
    label?: true
    writing?: true
    writingModel?: true
    writingModelZh?: true
    translation?: true
    translationReference?: true
    subjective?: true
    passages?: true
    questions?: true
    byPart?: true
    questionCount?: true
    audioUrl?: true
    audioHls?: true
    audioPieces?: true
    listenedAt?: true
    source?: true
    createdAt?: true
  }

  export type PaperCountAggregateInputType = {
    id?: true
    slug?: true
    year?: true
    month?: true
    set?: true
    label?: true
    writing?: true
    writingModel?: true
    writingModelZh?: true
    translation?: true
    translationReference?: true
    subjective?: true
    passages?: true
    questions?: true
    byPart?: true
    questionCount?: true
    audioUrl?: true
    audioHls?: true
    audioPieces?: true
    listenedAt?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type PaperAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Paper to aggregate.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Papers
    **/
    _count?: true | PaperCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaperAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaperSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaperMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaperMaxAggregateInputType
  }

  export type GetPaperAggregateType<T extends PaperAggregateArgs> = {
        [P in keyof T & keyof AggregatePaper]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaper[P]>
      : GetScalarType<T[P], AggregatePaper[P]>
  }




  export type PaperGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaperWhereInput
    orderBy?: PaperOrderByWithAggregationInput | PaperOrderByWithAggregationInput[]
    by: PaperScalarFieldEnum[] | PaperScalarFieldEnum
    having?: PaperScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaperCountAggregateInputType | true
    _avg?: PaperAvgAggregateInputType
    _sum?: PaperSumAggregateInputType
    _min?: PaperMinAggregateInputType
    _max?: PaperMaxAggregateInputType
  }

  export type PaperGroupByOutputType = {
    id: string
    slug: string
    year: number
    month: number
    set: string
    label: string
    writing: string | null
    writingModel: string | null
    writingModelZh: string | null
    translation: string | null
    translationReference: string | null
    subjective: string
    passages: string
    questions: string
    byPart: string
    questionCount: number
    audioUrl: string | null
    audioHls: string | null
    audioPieces: string
    listenedAt: Date | null
    source: string
    createdAt: Date
    _count: PaperCountAggregateOutputType | null
    _avg: PaperAvgAggregateOutputType | null
    _sum: PaperSumAggregateOutputType | null
    _min: PaperMinAggregateOutputType | null
    _max: PaperMaxAggregateOutputType | null
  }

  type GetPaperGroupByPayload<T extends PaperGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaperGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaperGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaperGroupByOutputType[P]>
            : GetScalarType<T[P], PaperGroupByOutputType[P]>
        }
      >
    >


  export type PaperSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    year?: boolean
    month?: boolean
    set?: boolean
    label?: boolean
    writing?: boolean
    writingModel?: boolean
    writingModelZh?: boolean
    translation?: boolean
    translationReference?: boolean
    subjective?: boolean
    passages?: boolean
    questions?: boolean
    byPart?: boolean
    questionCount?: boolean
    audioUrl?: boolean
    audioHls?: boolean
    audioPieces?: boolean
    listenedAt?: boolean
    source?: boolean
    createdAt?: boolean
    attempts?: boolean | Paper$attemptsArgs<ExtArgs>
    _count?: boolean | PaperCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper"]>

  export type PaperSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    year?: boolean
    month?: boolean
    set?: boolean
    label?: boolean
    writing?: boolean
    writingModel?: boolean
    writingModelZh?: boolean
    translation?: boolean
    translationReference?: boolean
    subjective?: boolean
    passages?: boolean
    questions?: boolean
    byPart?: boolean
    questionCount?: boolean
    audioUrl?: boolean
    audioHls?: boolean
    audioPieces?: boolean
    listenedAt?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["paper"]>

  export type PaperSelectScalar = {
    id?: boolean
    slug?: boolean
    year?: boolean
    month?: boolean
    set?: boolean
    label?: boolean
    writing?: boolean
    writingModel?: boolean
    writingModelZh?: boolean
    translation?: boolean
    translationReference?: boolean
    subjective?: boolean
    passages?: boolean
    questions?: boolean
    byPart?: boolean
    questionCount?: boolean
    audioUrl?: boolean
    audioHls?: boolean
    audioPieces?: boolean
    listenedAt?: boolean
    source?: boolean
    createdAt?: boolean
  }

  export type PaperInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | Paper$attemptsArgs<ExtArgs>
    _count?: boolean | PaperCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaperIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PaperPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Paper"
    objects: {
      attempts: Prisma.$PaperAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      year: number
      month: number
      set: string
      label: string
      writing: string | null
      writingModel: string | null
      writingModelZh: string | null
      translation: string | null
      translationReference: string | null
      subjective: string
      passages: string
      questions: string
      byPart: string
      questionCount: number
      audioUrl: string | null
      audioHls: string | null
      audioPieces: string
      /**
       * 第一次播放这套听力音频的时间（列表里标"已听过"）
       */
      listenedAt: Date | null
      source: string
      createdAt: Date
    }, ExtArgs["result"]["paper"]>
    composites: {}
  }

  type PaperGetPayload<S extends boolean | null | undefined | PaperDefaultArgs> = $Result.GetResult<Prisma.$PaperPayload, S>

  type PaperCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaperFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaperCountAggregateInputType | true
    }

  export interface PaperDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Paper'], meta: { name: 'Paper' } }
    /**
     * Find zero or one Paper that matches the filter.
     * @param {PaperFindUniqueArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaperFindUniqueArgs>(args: SelectSubset<T, PaperFindUniqueArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Paper that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaperFindUniqueOrThrowArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaperFindUniqueOrThrowArgs>(args: SelectSubset<T, PaperFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Paper that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperFindFirstArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaperFindFirstArgs>(args?: SelectSubset<T, PaperFindFirstArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Paper that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperFindFirstOrThrowArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaperFindFirstOrThrowArgs>(args?: SelectSubset<T, PaperFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Papers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Papers
     * const papers = await prisma.paper.findMany()
     * 
     * // Get first 10 Papers
     * const papers = await prisma.paper.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paperWithIdOnly = await prisma.paper.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaperFindManyArgs>(args?: SelectSubset<T, PaperFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Paper.
     * @param {PaperCreateArgs} args - Arguments to create a Paper.
     * @example
     * // Create one Paper
     * const Paper = await prisma.paper.create({
     *   data: {
     *     // ... data to create a Paper
     *   }
     * })
     * 
     */
    create<T extends PaperCreateArgs>(args: SelectSubset<T, PaperCreateArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Papers.
     * @param {PaperCreateManyArgs} args - Arguments to create many Papers.
     * @example
     * // Create many Papers
     * const paper = await prisma.paper.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaperCreateManyArgs>(args?: SelectSubset<T, PaperCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Papers and returns the data saved in the database.
     * @param {PaperCreateManyAndReturnArgs} args - Arguments to create many Papers.
     * @example
     * // Create many Papers
     * const paper = await prisma.paper.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Papers and only return the `id`
     * const paperWithIdOnly = await prisma.paper.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaperCreateManyAndReturnArgs>(args?: SelectSubset<T, PaperCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Paper.
     * @param {PaperDeleteArgs} args - Arguments to delete one Paper.
     * @example
     * // Delete one Paper
     * const Paper = await prisma.paper.delete({
     *   where: {
     *     // ... filter to delete one Paper
     *   }
     * })
     * 
     */
    delete<T extends PaperDeleteArgs>(args: SelectSubset<T, PaperDeleteArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Paper.
     * @param {PaperUpdateArgs} args - Arguments to update one Paper.
     * @example
     * // Update one Paper
     * const paper = await prisma.paper.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaperUpdateArgs>(args: SelectSubset<T, PaperUpdateArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Papers.
     * @param {PaperDeleteManyArgs} args - Arguments to filter Papers to delete.
     * @example
     * // Delete a few Papers
     * const { count } = await prisma.paper.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaperDeleteManyArgs>(args?: SelectSubset<T, PaperDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Papers
     * const paper = await prisma.paper.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaperUpdateManyArgs>(args: SelectSubset<T, PaperUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Paper.
     * @param {PaperUpsertArgs} args - Arguments to update or create a Paper.
     * @example
     * // Update or create a Paper
     * const paper = await prisma.paper.upsert({
     *   create: {
     *     // ... data to create a Paper
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paper we want to update
     *   }
     * })
     */
    upsert<T extends PaperUpsertArgs>(args: SelectSubset<T, PaperUpsertArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperCountArgs} args - Arguments to filter Papers to count.
     * @example
     * // Count the number of Papers
     * const count = await prisma.paper.count({
     *   where: {
     *     // ... the filter for the Papers we want to count
     *   }
     * })
    **/
    count<T extends PaperCountArgs>(
      args?: Subset<T, PaperCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaperCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaperAggregateArgs>(args: Subset<T, PaperAggregateArgs>): Prisma.PrismaPromise<GetPaperAggregateType<T>>

    /**
     * Group by Paper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaperGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaperGroupByArgs['orderBy'] }
        : { orderBy?: PaperGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaperGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaperGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Paper model
   */
  readonly fields: PaperFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Paper.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaperClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempts<T extends Paper$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Paper$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Paper model
   */ 
  interface PaperFieldRefs {
    readonly id: FieldRef<"Paper", 'String'>
    readonly slug: FieldRef<"Paper", 'String'>
    readonly year: FieldRef<"Paper", 'Int'>
    readonly month: FieldRef<"Paper", 'Int'>
    readonly set: FieldRef<"Paper", 'String'>
    readonly label: FieldRef<"Paper", 'String'>
    readonly writing: FieldRef<"Paper", 'String'>
    readonly writingModel: FieldRef<"Paper", 'String'>
    readonly writingModelZh: FieldRef<"Paper", 'String'>
    readonly translation: FieldRef<"Paper", 'String'>
    readonly translationReference: FieldRef<"Paper", 'String'>
    readonly subjective: FieldRef<"Paper", 'String'>
    readonly passages: FieldRef<"Paper", 'String'>
    readonly questions: FieldRef<"Paper", 'String'>
    readonly byPart: FieldRef<"Paper", 'String'>
    readonly questionCount: FieldRef<"Paper", 'Int'>
    readonly audioUrl: FieldRef<"Paper", 'String'>
    readonly audioHls: FieldRef<"Paper", 'String'>
    readonly audioPieces: FieldRef<"Paper", 'String'>
    readonly listenedAt: FieldRef<"Paper", 'DateTime'>
    readonly source: FieldRef<"Paper", 'String'>
    readonly createdAt: FieldRef<"Paper", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Paper findUnique
   */
  export type PaperFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper findUniqueOrThrow
   */
  export type PaperFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper findFirst
   */
  export type PaperFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Papers.
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Papers.
     */
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Paper findFirstOrThrow
   */
  export type PaperFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Papers.
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Papers.
     */
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Paper findMany
   */
  export type PaperFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Papers to fetch.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Papers.
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Paper create
   */
  export type PaperCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * The data needed to create a Paper.
     */
    data: XOR<PaperCreateInput, PaperUncheckedCreateInput>
  }

  /**
   * Paper createMany
   */
  export type PaperCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Papers.
     */
    data: PaperCreateManyInput | PaperCreateManyInput[]
  }

  /**
   * Paper createManyAndReturn
   */
  export type PaperCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Papers.
     */
    data: PaperCreateManyInput | PaperCreateManyInput[]
  }

  /**
   * Paper update
   */
  export type PaperUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * The data needed to update a Paper.
     */
    data: XOR<PaperUpdateInput, PaperUncheckedUpdateInput>
    /**
     * Choose, which Paper to update.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper updateMany
   */
  export type PaperUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Papers.
     */
    data: XOR<PaperUpdateManyMutationInput, PaperUncheckedUpdateManyInput>
    /**
     * Filter which Papers to update
     */
    where?: PaperWhereInput
  }

  /**
   * Paper upsert
   */
  export type PaperUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * The filter to search for the Paper to update in case it exists.
     */
    where: PaperWhereUniqueInput
    /**
     * In case the Paper found by the `where` argument doesn't exist, create a new Paper with this data.
     */
    create: XOR<PaperCreateInput, PaperUncheckedCreateInput>
    /**
     * In case the Paper was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaperUpdateInput, PaperUncheckedUpdateInput>
  }

  /**
   * Paper delete
   */
  export type PaperDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter which Paper to delete.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper deleteMany
   */
  export type PaperDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Papers to delete
     */
    where?: PaperWhereInput
  }

  /**
   * Paper.attempts
   */
  export type Paper$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    where?: PaperAttemptWhereInput
    orderBy?: PaperAttemptOrderByWithRelationInput | PaperAttemptOrderByWithRelationInput[]
    cursor?: PaperAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaperAttemptScalarFieldEnum | PaperAttemptScalarFieldEnum[]
  }

  /**
   * Paper without action
   */
  export type PaperDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
  }


  /**
   * Model PaperAttempt
   */

  export type AggregatePaperAttempt = {
    _count: PaperAttemptCountAggregateOutputType | null
    _avg: PaperAttemptAvgAggregateOutputType | null
    _sum: PaperAttemptSumAggregateOutputType | null
    _min: PaperAttemptMinAggregateOutputType | null
    _max: PaperAttemptMaxAggregateOutputType | null
  }

  export type PaperAttemptAvgAggregateOutputType = {
    total: number | null
    correct: number | null
    minutes: number | null
  }

  export type PaperAttemptSumAggregateOutputType = {
    total: number | null
    correct: number | null
    minutes: number | null
  }

  export type PaperAttemptMinAggregateOutputType = {
    id: string | null
    paperId: string | null
    section: string | null
    total: number | null
    correct: number | null
    detail: string | null
    minutes: number | null
    createdAt: Date | null
  }

  export type PaperAttemptMaxAggregateOutputType = {
    id: string | null
    paperId: string | null
    section: string | null
    total: number | null
    correct: number | null
    detail: string | null
    minutes: number | null
    createdAt: Date | null
  }

  export type PaperAttemptCountAggregateOutputType = {
    id: number
    paperId: number
    section: number
    total: number
    correct: number
    detail: number
    minutes: number
    createdAt: number
    _all: number
  }


  export type PaperAttemptAvgAggregateInputType = {
    total?: true
    correct?: true
    minutes?: true
  }

  export type PaperAttemptSumAggregateInputType = {
    total?: true
    correct?: true
    minutes?: true
  }

  export type PaperAttemptMinAggregateInputType = {
    id?: true
    paperId?: true
    section?: true
    total?: true
    correct?: true
    detail?: true
    minutes?: true
    createdAt?: true
  }

  export type PaperAttemptMaxAggregateInputType = {
    id?: true
    paperId?: true
    section?: true
    total?: true
    correct?: true
    detail?: true
    minutes?: true
    createdAt?: true
  }

  export type PaperAttemptCountAggregateInputType = {
    id?: true
    paperId?: true
    section?: true
    total?: true
    correct?: true
    detail?: true
    minutes?: true
    createdAt?: true
    _all?: true
  }

  export type PaperAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaperAttempt to aggregate.
     */
    where?: PaperAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperAttempts to fetch.
     */
    orderBy?: PaperAttemptOrderByWithRelationInput | PaperAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaperAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaperAttempts
    **/
    _count?: true | PaperAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaperAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaperAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaperAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaperAttemptMaxAggregateInputType
  }

  export type GetPaperAttemptAggregateType<T extends PaperAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregatePaperAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaperAttempt[P]>
      : GetScalarType<T[P], AggregatePaperAttempt[P]>
  }




  export type PaperAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaperAttemptWhereInput
    orderBy?: PaperAttemptOrderByWithAggregationInput | PaperAttemptOrderByWithAggregationInput[]
    by: PaperAttemptScalarFieldEnum[] | PaperAttemptScalarFieldEnum
    having?: PaperAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaperAttemptCountAggregateInputType | true
    _avg?: PaperAttemptAvgAggregateInputType
    _sum?: PaperAttemptSumAggregateInputType
    _min?: PaperAttemptMinAggregateInputType
    _max?: PaperAttemptMaxAggregateInputType
  }

  export type PaperAttemptGroupByOutputType = {
    id: string
    paperId: string
    section: string
    total: number
    correct: number
    detail: string
    minutes: number
    createdAt: Date
    _count: PaperAttemptCountAggregateOutputType | null
    _avg: PaperAttemptAvgAggregateOutputType | null
    _sum: PaperAttemptSumAggregateOutputType | null
    _min: PaperAttemptMinAggregateOutputType | null
    _max: PaperAttemptMaxAggregateOutputType | null
  }

  type GetPaperAttemptGroupByPayload<T extends PaperAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaperAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaperAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaperAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], PaperAttemptGroupByOutputType[P]>
        }
      >
    >


  export type PaperAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperId?: boolean
    section?: boolean
    total?: boolean
    correct?: boolean
    detail?: boolean
    minutes?: boolean
    createdAt?: boolean
    paper?: boolean | PaperDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paperAttempt"]>

  export type PaperAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperId?: boolean
    section?: boolean
    total?: boolean
    correct?: boolean
    detail?: boolean
    minutes?: boolean
    createdAt?: boolean
    paper?: boolean | PaperDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paperAttempt"]>

  export type PaperAttemptSelectScalar = {
    id?: boolean
    paperId?: boolean
    section?: boolean
    total?: boolean
    correct?: boolean
    detail?: boolean
    minutes?: boolean
    createdAt?: boolean
  }

  export type PaperAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper?: boolean | PaperDefaultArgs<ExtArgs>
  }
  export type PaperAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper?: boolean | PaperDefaultArgs<ExtArgs>
  }

  export type $PaperAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaperAttempt"
    objects: {
      paper: Prisma.$PaperPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paperId: string
      section: string
      total: number
      correct: number
      detail: string
      minutes: number
      createdAt: Date
    }, ExtArgs["result"]["paperAttempt"]>
    composites: {}
  }

  type PaperAttemptGetPayload<S extends boolean | null | undefined | PaperAttemptDefaultArgs> = $Result.GetResult<Prisma.$PaperAttemptPayload, S>

  type PaperAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaperAttemptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaperAttemptCountAggregateInputType | true
    }

  export interface PaperAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaperAttempt'], meta: { name: 'PaperAttempt' } }
    /**
     * Find zero or one PaperAttempt that matches the filter.
     * @param {PaperAttemptFindUniqueArgs} args - Arguments to find a PaperAttempt
     * @example
     * // Get one PaperAttempt
     * const paperAttempt = await prisma.paperAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaperAttemptFindUniqueArgs>(args: SelectSubset<T, PaperAttemptFindUniqueArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PaperAttempt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaperAttemptFindUniqueOrThrowArgs} args - Arguments to find a PaperAttempt
     * @example
     * // Get one PaperAttempt
     * const paperAttempt = await prisma.paperAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaperAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, PaperAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PaperAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptFindFirstArgs} args - Arguments to find a PaperAttempt
     * @example
     * // Get one PaperAttempt
     * const paperAttempt = await prisma.paperAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaperAttemptFindFirstArgs>(args?: SelectSubset<T, PaperAttemptFindFirstArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PaperAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptFindFirstOrThrowArgs} args - Arguments to find a PaperAttempt
     * @example
     * // Get one PaperAttempt
     * const paperAttempt = await prisma.paperAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaperAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, PaperAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PaperAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaperAttempts
     * const paperAttempts = await prisma.paperAttempt.findMany()
     * 
     * // Get first 10 PaperAttempts
     * const paperAttempts = await prisma.paperAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paperAttemptWithIdOnly = await prisma.paperAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaperAttemptFindManyArgs>(args?: SelectSubset<T, PaperAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PaperAttempt.
     * @param {PaperAttemptCreateArgs} args - Arguments to create a PaperAttempt.
     * @example
     * // Create one PaperAttempt
     * const PaperAttempt = await prisma.paperAttempt.create({
     *   data: {
     *     // ... data to create a PaperAttempt
     *   }
     * })
     * 
     */
    create<T extends PaperAttemptCreateArgs>(args: SelectSubset<T, PaperAttemptCreateArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PaperAttempts.
     * @param {PaperAttemptCreateManyArgs} args - Arguments to create many PaperAttempts.
     * @example
     * // Create many PaperAttempts
     * const paperAttempt = await prisma.paperAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaperAttemptCreateManyArgs>(args?: SelectSubset<T, PaperAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaperAttempts and returns the data saved in the database.
     * @param {PaperAttemptCreateManyAndReturnArgs} args - Arguments to create many PaperAttempts.
     * @example
     * // Create many PaperAttempts
     * const paperAttempt = await prisma.paperAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaperAttempts and only return the `id`
     * const paperAttemptWithIdOnly = await prisma.paperAttempt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaperAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, PaperAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PaperAttempt.
     * @param {PaperAttemptDeleteArgs} args - Arguments to delete one PaperAttempt.
     * @example
     * // Delete one PaperAttempt
     * const PaperAttempt = await prisma.paperAttempt.delete({
     *   where: {
     *     // ... filter to delete one PaperAttempt
     *   }
     * })
     * 
     */
    delete<T extends PaperAttemptDeleteArgs>(args: SelectSubset<T, PaperAttemptDeleteArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PaperAttempt.
     * @param {PaperAttemptUpdateArgs} args - Arguments to update one PaperAttempt.
     * @example
     * // Update one PaperAttempt
     * const paperAttempt = await prisma.paperAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaperAttemptUpdateArgs>(args: SelectSubset<T, PaperAttemptUpdateArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PaperAttempts.
     * @param {PaperAttemptDeleteManyArgs} args - Arguments to filter PaperAttempts to delete.
     * @example
     * // Delete a few PaperAttempts
     * const { count } = await prisma.paperAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaperAttemptDeleteManyArgs>(args?: SelectSubset<T, PaperAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaperAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaperAttempts
     * const paperAttempt = await prisma.paperAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaperAttemptUpdateManyArgs>(args: SelectSubset<T, PaperAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PaperAttempt.
     * @param {PaperAttemptUpsertArgs} args - Arguments to update or create a PaperAttempt.
     * @example
     * // Update or create a PaperAttempt
     * const paperAttempt = await prisma.paperAttempt.upsert({
     *   create: {
     *     // ... data to create a PaperAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaperAttempt we want to update
     *   }
     * })
     */
    upsert<T extends PaperAttemptUpsertArgs>(args: SelectSubset<T, PaperAttemptUpsertArgs<ExtArgs>>): Prisma__PaperAttemptClient<$Result.GetResult<Prisma.$PaperAttemptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PaperAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptCountArgs} args - Arguments to filter PaperAttempts to count.
     * @example
     * // Count the number of PaperAttempts
     * const count = await prisma.paperAttempt.count({
     *   where: {
     *     // ... the filter for the PaperAttempts we want to count
     *   }
     * })
    **/
    count<T extends PaperAttemptCountArgs>(
      args?: Subset<T, PaperAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaperAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaperAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaperAttemptAggregateArgs>(args: Subset<T, PaperAttemptAggregateArgs>): Prisma.PrismaPromise<GetPaperAttemptAggregateType<T>>

    /**
     * Group by PaperAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaperAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaperAttemptGroupByArgs['orderBy'] }
        : { orderBy?: PaperAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaperAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaperAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaperAttempt model
   */
  readonly fields: PaperAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaperAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaperAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paper<T extends PaperDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaperDefaultArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaperAttempt model
   */ 
  interface PaperAttemptFieldRefs {
    readonly id: FieldRef<"PaperAttempt", 'String'>
    readonly paperId: FieldRef<"PaperAttempt", 'String'>
    readonly section: FieldRef<"PaperAttempt", 'String'>
    readonly total: FieldRef<"PaperAttempt", 'Int'>
    readonly correct: FieldRef<"PaperAttempt", 'Int'>
    readonly detail: FieldRef<"PaperAttempt", 'String'>
    readonly minutes: FieldRef<"PaperAttempt", 'Int'>
    readonly createdAt: FieldRef<"PaperAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaperAttempt findUnique
   */
  export type PaperAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PaperAttempt to fetch.
     */
    where: PaperAttemptWhereUniqueInput
  }

  /**
   * PaperAttempt findUniqueOrThrow
   */
  export type PaperAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PaperAttempt to fetch.
     */
    where: PaperAttemptWhereUniqueInput
  }

  /**
   * PaperAttempt findFirst
   */
  export type PaperAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PaperAttempt to fetch.
     */
    where?: PaperAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperAttempts to fetch.
     */
    orderBy?: PaperAttemptOrderByWithRelationInput | PaperAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaperAttempts.
     */
    cursor?: PaperAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaperAttempts.
     */
    distinct?: PaperAttemptScalarFieldEnum | PaperAttemptScalarFieldEnum[]
  }

  /**
   * PaperAttempt findFirstOrThrow
   */
  export type PaperAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PaperAttempt to fetch.
     */
    where?: PaperAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperAttempts to fetch.
     */
    orderBy?: PaperAttemptOrderByWithRelationInput | PaperAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaperAttempts.
     */
    cursor?: PaperAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaperAttempts.
     */
    distinct?: PaperAttemptScalarFieldEnum | PaperAttemptScalarFieldEnum[]
  }

  /**
   * PaperAttempt findMany
   */
  export type PaperAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PaperAttempts to fetch.
     */
    where?: PaperAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperAttempts to fetch.
     */
    orderBy?: PaperAttemptOrderByWithRelationInput | PaperAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaperAttempts.
     */
    cursor?: PaperAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperAttempts.
     */
    skip?: number
    distinct?: PaperAttemptScalarFieldEnum | PaperAttemptScalarFieldEnum[]
  }

  /**
   * PaperAttempt create
   */
  export type PaperAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a PaperAttempt.
     */
    data: XOR<PaperAttemptCreateInput, PaperAttemptUncheckedCreateInput>
  }

  /**
   * PaperAttempt createMany
   */
  export type PaperAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaperAttempts.
     */
    data: PaperAttemptCreateManyInput | PaperAttemptCreateManyInput[]
  }

  /**
   * PaperAttempt createManyAndReturn
   */
  export type PaperAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PaperAttempts.
     */
    data: PaperAttemptCreateManyInput | PaperAttemptCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaperAttempt update
   */
  export type PaperAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a PaperAttempt.
     */
    data: XOR<PaperAttemptUpdateInput, PaperAttemptUncheckedUpdateInput>
    /**
     * Choose, which PaperAttempt to update.
     */
    where: PaperAttemptWhereUniqueInput
  }

  /**
   * PaperAttempt updateMany
   */
  export type PaperAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaperAttempts.
     */
    data: XOR<PaperAttemptUpdateManyMutationInput, PaperAttemptUncheckedUpdateManyInput>
    /**
     * Filter which PaperAttempts to update
     */
    where?: PaperAttemptWhereInput
  }

  /**
   * PaperAttempt upsert
   */
  export type PaperAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the PaperAttempt to update in case it exists.
     */
    where: PaperAttemptWhereUniqueInput
    /**
     * In case the PaperAttempt found by the `where` argument doesn't exist, create a new PaperAttempt with this data.
     */
    create: XOR<PaperAttemptCreateInput, PaperAttemptUncheckedCreateInput>
    /**
     * In case the PaperAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaperAttemptUpdateInput, PaperAttemptUncheckedUpdateInput>
  }

  /**
   * PaperAttempt delete
   */
  export type PaperAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
    /**
     * Filter which PaperAttempt to delete.
     */
    where: PaperAttemptWhereUniqueInput
  }

  /**
   * PaperAttempt deleteMany
   */
  export type PaperAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaperAttempts to delete
     */
    where?: PaperAttemptWhereInput
  }

  /**
   * PaperAttempt without action
   */
  export type PaperAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperAttempt
     */
    select?: PaperAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperAttemptInclude<ExtArgs> | null
  }


  /**
   * Model DailyArticle
   */

  export type AggregateDailyArticle = {
    _count: DailyArticleCountAggregateOutputType | null
    _min: DailyArticleMinAggregateOutputType | null
    _max: DailyArticleMaxAggregateOutputType | null
  }

  export type DailyArticleMinAggregateOutputType = {
    id: string | null
    date: string | null
    title: string | null
    sourceUrl: string | null
    paragraphs: string | null
    audioPath: string | null
    vocab: string | null
    quiz: string | null
    translation: string | null
    generatedBy: string | null
    createdAt: Date | null
  }

  export type DailyArticleMaxAggregateOutputType = {
    id: string | null
    date: string | null
    title: string | null
    sourceUrl: string | null
    paragraphs: string | null
    audioPath: string | null
    vocab: string | null
    quiz: string | null
    translation: string | null
    generatedBy: string | null
    createdAt: Date | null
  }

  export type DailyArticleCountAggregateOutputType = {
    id: number
    date: number
    title: number
    sourceUrl: number
    paragraphs: number
    audioPath: number
    vocab: number
    quiz: number
    translation: number
    generatedBy: number
    createdAt: number
    _all: number
  }


  export type DailyArticleMinAggregateInputType = {
    id?: true
    date?: true
    title?: true
    sourceUrl?: true
    paragraphs?: true
    audioPath?: true
    vocab?: true
    quiz?: true
    translation?: true
    generatedBy?: true
    createdAt?: true
  }

  export type DailyArticleMaxAggregateInputType = {
    id?: true
    date?: true
    title?: true
    sourceUrl?: true
    paragraphs?: true
    audioPath?: true
    vocab?: true
    quiz?: true
    translation?: true
    generatedBy?: true
    createdAt?: true
  }

  export type DailyArticleCountAggregateInputType = {
    id?: true
    date?: true
    title?: true
    sourceUrl?: true
    paragraphs?: true
    audioPath?: true
    vocab?: true
    quiz?: true
    translation?: true
    generatedBy?: true
    createdAt?: true
    _all?: true
  }

  export type DailyArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyArticle to aggregate.
     */
    where?: DailyArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyArticles to fetch.
     */
    orderBy?: DailyArticleOrderByWithRelationInput | DailyArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyArticles
    **/
    _count?: true | DailyArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyArticleMaxAggregateInputType
  }

  export type GetDailyArticleAggregateType<T extends DailyArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyArticle[P]>
      : GetScalarType<T[P], AggregateDailyArticle[P]>
  }




  export type DailyArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyArticleWhereInput
    orderBy?: DailyArticleOrderByWithAggregationInput | DailyArticleOrderByWithAggregationInput[]
    by: DailyArticleScalarFieldEnum[] | DailyArticleScalarFieldEnum
    having?: DailyArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyArticleCountAggregateInputType | true
    _min?: DailyArticleMinAggregateInputType
    _max?: DailyArticleMaxAggregateInputType
  }

  export type DailyArticleGroupByOutputType = {
    id: string
    date: string
    title: string
    sourceUrl: string
    paragraphs: string
    audioPath: string | null
    vocab: string
    quiz: string
    translation: string
    generatedBy: string
    createdAt: Date
    _count: DailyArticleCountAggregateOutputType | null
    _min: DailyArticleMinAggregateOutputType | null
    _max: DailyArticleMaxAggregateOutputType | null
  }

  type GetDailyArticleGroupByPayload<T extends DailyArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyArticleGroupByOutputType[P]>
            : GetScalarType<T[P], DailyArticleGroupByOutputType[P]>
        }
      >
    >


  export type DailyArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    title?: boolean
    sourceUrl?: boolean
    paragraphs?: boolean
    audioPath?: boolean
    vocab?: boolean
    quiz?: boolean
    translation?: boolean
    generatedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dailyArticle"]>

  export type DailyArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    title?: boolean
    sourceUrl?: boolean
    paragraphs?: boolean
    audioPath?: boolean
    vocab?: boolean
    quiz?: boolean
    translation?: boolean
    generatedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dailyArticle"]>

  export type DailyArticleSelectScalar = {
    id?: boolean
    date?: boolean
    title?: boolean
    sourceUrl?: boolean
    paragraphs?: boolean
    audioPath?: boolean
    vocab?: boolean
    quiz?: boolean
    translation?: boolean
    generatedBy?: boolean
    createdAt?: boolean
  }


  export type $DailyArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyArticle"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: string
      title: string
      sourceUrl: string
      paragraphs: string
      audioPath: string | null
      vocab: string
      quiz: string
      translation: string
      generatedBy: string
      createdAt: Date
    }, ExtArgs["result"]["dailyArticle"]>
    composites: {}
  }

  type DailyArticleGetPayload<S extends boolean | null | undefined | DailyArticleDefaultArgs> = $Result.GetResult<Prisma.$DailyArticlePayload, S>

  type DailyArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyArticleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyArticleCountAggregateInputType | true
    }

  export interface DailyArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyArticle'], meta: { name: 'DailyArticle' } }
    /**
     * Find zero or one DailyArticle that matches the filter.
     * @param {DailyArticleFindUniqueArgs} args - Arguments to find a DailyArticle
     * @example
     * // Get one DailyArticle
     * const dailyArticle = await prisma.dailyArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyArticleFindUniqueArgs>(args: SelectSubset<T, DailyArticleFindUniqueArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyArticle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyArticleFindUniqueOrThrowArgs} args - Arguments to find a DailyArticle
     * @example
     * // Get one DailyArticle
     * const dailyArticle = await prisma.dailyArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleFindFirstArgs} args - Arguments to find a DailyArticle
     * @example
     * // Get one DailyArticle
     * const dailyArticle = await prisma.dailyArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyArticleFindFirstArgs>(args?: SelectSubset<T, DailyArticleFindFirstArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleFindFirstOrThrowArgs} args - Arguments to find a DailyArticle
     * @example
     * // Get one DailyArticle
     * const dailyArticle = await prisma.dailyArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyArticles
     * const dailyArticles = await prisma.dailyArticle.findMany()
     * 
     * // Get first 10 DailyArticles
     * const dailyArticles = await prisma.dailyArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyArticleWithIdOnly = await prisma.dailyArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyArticleFindManyArgs>(args?: SelectSubset<T, DailyArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyArticle.
     * @param {DailyArticleCreateArgs} args - Arguments to create a DailyArticle.
     * @example
     * // Create one DailyArticle
     * const DailyArticle = await prisma.dailyArticle.create({
     *   data: {
     *     // ... data to create a DailyArticle
     *   }
     * })
     * 
     */
    create<T extends DailyArticleCreateArgs>(args: SelectSubset<T, DailyArticleCreateArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyArticles.
     * @param {DailyArticleCreateManyArgs} args - Arguments to create many DailyArticles.
     * @example
     * // Create many DailyArticles
     * const dailyArticle = await prisma.dailyArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyArticleCreateManyArgs>(args?: SelectSubset<T, DailyArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyArticles and returns the data saved in the database.
     * @param {DailyArticleCreateManyAndReturnArgs} args - Arguments to create many DailyArticles.
     * @example
     * // Create many DailyArticles
     * const dailyArticle = await prisma.dailyArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyArticles and only return the `id`
     * const dailyArticleWithIdOnly = await prisma.dailyArticle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyArticle.
     * @param {DailyArticleDeleteArgs} args - Arguments to delete one DailyArticle.
     * @example
     * // Delete one DailyArticle
     * const DailyArticle = await prisma.dailyArticle.delete({
     *   where: {
     *     // ... filter to delete one DailyArticle
     *   }
     * })
     * 
     */
    delete<T extends DailyArticleDeleteArgs>(args: SelectSubset<T, DailyArticleDeleteArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyArticle.
     * @param {DailyArticleUpdateArgs} args - Arguments to update one DailyArticle.
     * @example
     * // Update one DailyArticle
     * const dailyArticle = await prisma.dailyArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyArticleUpdateArgs>(args: SelectSubset<T, DailyArticleUpdateArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyArticles.
     * @param {DailyArticleDeleteManyArgs} args - Arguments to filter DailyArticles to delete.
     * @example
     * // Delete a few DailyArticles
     * const { count } = await prisma.dailyArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyArticleDeleteManyArgs>(args?: SelectSubset<T, DailyArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyArticles
     * const dailyArticle = await prisma.dailyArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyArticleUpdateManyArgs>(args: SelectSubset<T, DailyArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyArticle.
     * @param {DailyArticleUpsertArgs} args - Arguments to update or create a DailyArticle.
     * @example
     * // Update or create a DailyArticle
     * const dailyArticle = await prisma.dailyArticle.upsert({
     *   create: {
     *     // ... data to create a DailyArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyArticle we want to update
     *   }
     * })
     */
    upsert<T extends DailyArticleUpsertArgs>(args: SelectSubset<T, DailyArticleUpsertArgs<ExtArgs>>): Prisma__DailyArticleClient<$Result.GetResult<Prisma.$DailyArticlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleCountArgs} args - Arguments to filter DailyArticles to count.
     * @example
     * // Count the number of DailyArticles
     * const count = await prisma.dailyArticle.count({
     *   where: {
     *     // ... the filter for the DailyArticles we want to count
     *   }
     * })
    **/
    count<T extends DailyArticleCountArgs>(
      args?: Subset<T, DailyArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyArticleAggregateArgs>(args: Subset<T, DailyArticleAggregateArgs>): Prisma.PrismaPromise<GetDailyArticleAggregateType<T>>

    /**
     * Group by DailyArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyArticleGroupByArgs['orderBy'] }
        : { orderBy?: DailyArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyArticle model
   */
  readonly fields: DailyArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyArticle model
   */ 
  interface DailyArticleFieldRefs {
    readonly id: FieldRef<"DailyArticle", 'String'>
    readonly date: FieldRef<"DailyArticle", 'String'>
    readonly title: FieldRef<"DailyArticle", 'String'>
    readonly sourceUrl: FieldRef<"DailyArticle", 'String'>
    readonly paragraphs: FieldRef<"DailyArticle", 'String'>
    readonly audioPath: FieldRef<"DailyArticle", 'String'>
    readonly vocab: FieldRef<"DailyArticle", 'String'>
    readonly quiz: FieldRef<"DailyArticle", 'String'>
    readonly translation: FieldRef<"DailyArticle", 'String'>
    readonly generatedBy: FieldRef<"DailyArticle", 'String'>
    readonly createdAt: FieldRef<"DailyArticle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyArticle findUnique
   */
  export type DailyArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * Filter, which DailyArticle to fetch.
     */
    where: DailyArticleWhereUniqueInput
  }

  /**
   * DailyArticle findUniqueOrThrow
   */
  export type DailyArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * Filter, which DailyArticle to fetch.
     */
    where: DailyArticleWhereUniqueInput
  }

  /**
   * DailyArticle findFirst
   */
  export type DailyArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * Filter, which DailyArticle to fetch.
     */
    where?: DailyArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyArticles to fetch.
     */
    orderBy?: DailyArticleOrderByWithRelationInput | DailyArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyArticles.
     */
    cursor?: DailyArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyArticles.
     */
    distinct?: DailyArticleScalarFieldEnum | DailyArticleScalarFieldEnum[]
  }

  /**
   * DailyArticle findFirstOrThrow
   */
  export type DailyArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * Filter, which DailyArticle to fetch.
     */
    where?: DailyArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyArticles to fetch.
     */
    orderBy?: DailyArticleOrderByWithRelationInput | DailyArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyArticles.
     */
    cursor?: DailyArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyArticles.
     */
    distinct?: DailyArticleScalarFieldEnum | DailyArticleScalarFieldEnum[]
  }

  /**
   * DailyArticle findMany
   */
  export type DailyArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * Filter, which DailyArticles to fetch.
     */
    where?: DailyArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyArticles to fetch.
     */
    orderBy?: DailyArticleOrderByWithRelationInput | DailyArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyArticles.
     */
    cursor?: DailyArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyArticles.
     */
    skip?: number
    distinct?: DailyArticleScalarFieldEnum | DailyArticleScalarFieldEnum[]
  }

  /**
   * DailyArticle create
   */
  export type DailyArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * The data needed to create a DailyArticle.
     */
    data: XOR<DailyArticleCreateInput, DailyArticleUncheckedCreateInput>
  }

  /**
   * DailyArticle createMany
   */
  export type DailyArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyArticles.
     */
    data: DailyArticleCreateManyInput | DailyArticleCreateManyInput[]
  }

  /**
   * DailyArticle createManyAndReturn
   */
  export type DailyArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyArticles.
     */
    data: DailyArticleCreateManyInput | DailyArticleCreateManyInput[]
  }

  /**
   * DailyArticle update
   */
  export type DailyArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * The data needed to update a DailyArticle.
     */
    data: XOR<DailyArticleUpdateInput, DailyArticleUncheckedUpdateInput>
    /**
     * Choose, which DailyArticle to update.
     */
    where: DailyArticleWhereUniqueInput
  }

  /**
   * DailyArticle updateMany
   */
  export type DailyArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyArticles.
     */
    data: XOR<DailyArticleUpdateManyMutationInput, DailyArticleUncheckedUpdateManyInput>
    /**
     * Filter which DailyArticles to update
     */
    where?: DailyArticleWhereInput
  }

  /**
   * DailyArticle upsert
   */
  export type DailyArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * The filter to search for the DailyArticle to update in case it exists.
     */
    where: DailyArticleWhereUniqueInput
    /**
     * In case the DailyArticle found by the `where` argument doesn't exist, create a new DailyArticle with this data.
     */
    create: XOR<DailyArticleCreateInput, DailyArticleUncheckedCreateInput>
    /**
     * In case the DailyArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyArticleUpdateInput, DailyArticleUncheckedUpdateInput>
  }

  /**
   * DailyArticle delete
   */
  export type DailyArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
    /**
     * Filter which DailyArticle to delete.
     */
    where: DailyArticleWhereUniqueInput
  }

  /**
   * DailyArticle deleteMany
   */
  export type DailyArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyArticles to delete
     */
    where?: DailyArticleWhereInput
  }

  /**
   * DailyArticle without action
   */
  export type DailyArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyArticle
     */
    select?: DailyArticleSelect<ExtArgs> | null
  }


  /**
   * Model ListeningItem
   */

  export type AggregateListeningItem = {
    _count: ListeningItemCountAggregateOutputType | null
    _avg: ListeningItemAvgAggregateOutputType | null
    _sum: ListeningItemSumAggregateOutputType | null
    _min: ListeningItemMinAggregateOutputType | null
    _max: ListeningItemMaxAggregateOutputType | null
  }

  export type ListeningItemAvgAggregateOutputType = {
    durationSec: number | null
  }

  export type ListeningItemSumAggregateOutputType = {
    durationSec: number | null
  }

  export type ListeningItemMinAggregateOutputType = {
    id: string | null
    source: string | null
    externalId: string | null
    title: string | null
    pageUrl: string | null
    audioUrl: string | null
    transcript: string | null
    summary: string | null
    level: string | null
    publishedAt: Date | null
    durationSec: number | null
    fetchedAt: Date | null
    listenedAt: Date | null
  }

  export type ListeningItemMaxAggregateOutputType = {
    id: string | null
    source: string | null
    externalId: string | null
    title: string | null
    pageUrl: string | null
    audioUrl: string | null
    transcript: string | null
    summary: string | null
    level: string | null
    publishedAt: Date | null
    durationSec: number | null
    fetchedAt: Date | null
    listenedAt: Date | null
  }

  export type ListeningItemCountAggregateOutputType = {
    id: number
    source: number
    externalId: number
    title: number
    pageUrl: number
    audioUrl: number
    transcript: number
    summary: number
    level: number
    publishedAt: number
    durationSec: number
    fetchedAt: number
    listenedAt: number
    _all: number
  }


  export type ListeningItemAvgAggregateInputType = {
    durationSec?: true
  }

  export type ListeningItemSumAggregateInputType = {
    durationSec?: true
  }

  export type ListeningItemMinAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    title?: true
    pageUrl?: true
    audioUrl?: true
    transcript?: true
    summary?: true
    level?: true
    publishedAt?: true
    durationSec?: true
    fetchedAt?: true
    listenedAt?: true
  }

  export type ListeningItemMaxAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    title?: true
    pageUrl?: true
    audioUrl?: true
    transcript?: true
    summary?: true
    level?: true
    publishedAt?: true
    durationSec?: true
    fetchedAt?: true
    listenedAt?: true
  }

  export type ListeningItemCountAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    title?: true
    pageUrl?: true
    audioUrl?: true
    transcript?: true
    summary?: true
    level?: true
    publishedAt?: true
    durationSec?: true
    fetchedAt?: true
    listenedAt?: true
    _all?: true
  }

  export type ListeningItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListeningItem to aggregate.
     */
    where?: ListeningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningItems to fetch.
     */
    orderBy?: ListeningItemOrderByWithRelationInput | ListeningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListeningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListeningItems
    **/
    _count?: true | ListeningItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListeningItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListeningItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListeningItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListeningItemMaxAggregateInputType
  }

  export type GetListeningItemAggregateType<T extends ListeningItemAggregateArgs> = {
        [P in keyof T & keyof AggregateListeningItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListeningItem[P]>
      : GetScalarType<T[P], AggregateListeningItem[P]>
  }




  export type ListeningItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListeningItemWhereInput
    orderBy?: ListeningItemOrderByWithAggregationInput | ListeningItemOrderByWithAggregationInput[]
    by: ListeningItemScalarFieldEnum[] | ListeningItemScalarFieldEnum
    having?: ListeningItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListeningItemCountAggregateInputType | true
    _avg?: ListeningItemAvgAggregateInputType
    _sum?: ListeningItemSumAggregateInputType
    _min?: ListeningItemMinAggregateInputType
    _max?: ListeningItemMaxAggregateInputType
  }

  export type ListeningItemGroupByOutputType = {
    id: string
    source: string
    externalId: string
    title: string
    pageUrl: string
    audioUrl: string
    transcript: string
    summary: string
    level: string
    publishedAt: Date | null
    durationSec: number | null
    fetchedAt: Date
    listenedAt: Date | null
    _count: ListeningItemCountAggregateOutputType | null
    _avg: ListeningItemAvgAggregateOutputType | null
    _sum: ListeningItemSumAggregateOutputType | null
    _min: ListeningItemMinAggregateOutputType | null
    _max: ListeningItemMaxAggregateOutputType | null
  }

  type GetListeningItemGroupByPayload<T extends ListeningItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListeningItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListeningItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListeningItemGroupByOutputType[P]>
            : GetScalarType<T[P], ListeningItemGroupByOutputType[P]>
        }
      >
    >


  export type ListeningItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    title?: boolean
    pageUrl?: boolean
    audioUrl?: boolean
    transcript?: boolean
    summary?: boolean
    level?: boolean
    publishedAt?: boolean
    durationSec?: boolean
    fetchedAt?: boolean
    listenedAt?: boolean
  }, ExtArgs["result"]["listeningItem"]>

  export type ListeningItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    title?: boolean
    pageUrl?: boolean
    audioUrl?: boolean
    transcript?: boolean
    summary?: boolean
    level?: boolean
    publishedAt?: boolean
    durationSec?: boolean
    fetchedAt?: boolean
    listenedAt?: boolean
  }, ExtArgs["result"]["listeningItem"]>

  export type ListeningItemSelectScalar = {
    id?: boolean
    source?: boolean
    externalId?: boolean
    title?: boolean
    pageUrl?: boolean
    audioUrl?: boolean
    transcript?: boolean
    summary?: boolean
    level?: boolean
    publishedAt?: boolean
    durationSec?: boolean
    fetchedAt?: boolean
    listenedAt?: boolean
  }


  export type $ListeningItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListeningItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      source: string
      externalId: string
      title: string
      pageUrl: string
      audioUrl: string
      transcript: string
      summary: string
      level: string
      publishedAt: Date | null
      durationSec: number | null
      fetchedAt: Date
      /**
       * 第一次真正听过的时间（用来在列表里标"已听过"并排到后面）
       */
      listenedAt: Date | null
    }, ExtArgs["result"]["listeningItem"]>
    composites: {}
  }

  type ListeningItemGetPayload<S extends boolean | null | undefined | ListeningItemDefaultArgs> = $Result.GetResult<Prisma.$ListeningItemPayload, S>

  type ListeningItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListeningItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListeningItemCountAggregateInputType | true
    }

  export interface ListeningItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListeningItem'], meta: { name: 'ListeningItem' } }
    /**
     * Find zero or one ListeningItem that matches the filter.
     * @param {ListeningItemFindUniqueArgs} args - Arguments to find a ListeningItem
     * @example
     * // Get one ListeningItem
     * const listeningItem = await prisma.listeningItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListeningItemFindUniqueArgs>(args: SelectSubset<T, ListeningItemFindUniqueArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ListeningItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListeningItemFindUniqueOrThrowArgs} args - Arguments to find a ListeningItem
     * @example
     * // Get one ListeningItem
     * const listeningItem = await prisma.listeningItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListeningItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ListeningItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ListeningItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemFindFirstArgs} args - Arguments to find a ListeningItem
     * @example
     * // Get one ListeningItem
     * const listeningItem = await prisma.listeningItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListeningItemFindFirstArgs>(args?: SelectSubset<T, ListeningItemFindFirstArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ListeningItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemFindFirstOrThrowArgs} args - Arguments to find a ListeningItem
     * @example
     * // Get one ListeningItem
     * const listeningItem = await prisma.listeningItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListeningItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ListeningItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ListeningItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListeningItems
     * const listeningItems = await prisma.listeningItem.findMany()
     * 
     * // Get first 10 ListeningItems
     * const listeningItems = await prisma.listeningItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listeningItemWithIdOnly = await prisma.listeningItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListeningItemFindManyArgs>(args?: SelectSubset<T, ListeningItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ListeningItem.
     * @param {ListeningItemCreateArgs} args - Arguments to create a ListeningItem.
     * @example
     * // Create one ListeningItem
     * const ListeningItem = await prisma.listeningItem.create({
     *   data: {
     *     // ... data to create a ListeningItem
     *   }
     * })
     * 
     */
    create<T extends ListeningItemCreateArgs>(args: SelectSubset<T, ListeningItemCreateArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ListeningItems.
     * @param {ListeningItemCreateManyArgs} args - Arguments to create many ListeningItems.
     * @example
     * // Create many ListeningItems
     * const listeningItem = await prisma.listeningItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListeningItemCreateManyArgs>(args?: SelectSubset<T, ListeningItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListeningItems and returns the data saved in the database.
     * @param {ListeningItemCreateManyAndReturnArgs} args - Arguments to create many ListeningItems.
     * @example
     * // Create many ListeningItems
     * const listeningItem = await prisma.listeningItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListeningItems and only return the `id`
     * const listeningItemWithIdOnly = await prisma.listeningItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListeningItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ListeningItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ListeningItem.
     * @param {ListeningItemDeleteArgs} args - Arguments to delete one ListeningItem.
     * @example
     * // Delete one ListeningItem
     * const ListeningItem = await prisma.listeningItem.delete({
     *   where: {
     *     // ... filter to delete one ListeningItem
     *   }
     * })
     * 
     */
    delete<T extends ListeningItemDeleteArgs>(args: SelectSubset<T, ListeningItemDeleteArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ListeningItem.
     * @param {ListeningItemUpdateArgs} args - Arguments to update one ListeningItem.
     * @example
     * // Update one ListeningItem
     * const listeningItem = await prisma.listeningItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListeningItemUpdateArgs>(args: SelectSubset<T, ListeningItemUpdateArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ListeningItems.
     * @param {ListeningItemDeleteManyArgs} args - Arguments to filter ListeningItems to delete.
     * @example
     * // Delete a few ListeningItems
     * const { count } = await prisma.listeningItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListeningItemDeleteManyArgs>(args?: SelectSubset<T, ListeningItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListeningItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListeningItems
     * const listeningItem = await prisma.listeningItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListeningItemUpdateManyArgs>(args: SelectSubset<T, ListeningItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ListeningItem.
     * @param {ListeningItemUpsertArgs} args - Arguments to update or create a ListeningItem.
     * @example
     * // Update or create a ListeningItem
     * const listeningItem = await prisma.listeningItem.upsert({
     *   create: {
     *     // ... data to create a ListeningItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListeningItem we want to update
     *   }
     * })
     */
    upsert<T extends ListeningItemUpsertArgs>(args: SelectSubset<T, ListeningItemUpsertArgs<ExtArgs>>): Prisma__ListeningItemClient<$Result.GetResult<Prisma.$ListeningItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ListeningItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemCountArgs} args - Arguments to filter ListeningItems to count.
     * @example
     * // Count the number of ListeningItems
     * const count = await prisma.listeningItem.count({
     *   where: {
     *     // ... the filter for the ListeningItems we want to count
     *   }
     * })
    **/
    count<T extends ListeningItemCountArgs>(
      args?: Subset<T, ListeningItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListeningItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListeningItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListeningItemAggregateArgs>(args: Subset<T, ListeningItemAggregateArgs>): Prisma.PrismaPromise<GetListeningItemAggregateType<T>>

    /**
     * Group by ListeningItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListeningItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListeningItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListeningItemGroupByArgs['orderBy'] }
        : { orderBy?: ListeningItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListeningItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListeningItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListeningItem model
   */
  readonly fields: ListeningItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListeningItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListeningItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListeningItem model
   */ 
  interface ListeningItemFieldRefs {
    readonly id: FieldRef<"ListeningItem", 'String'>
    readonly source: FieldRef<"ListeningItem", 'String'>
    readonly externalId: FieldRef<"ListeningItem", 'String'>
    readonly title: FieldRef<"ListeningItem", 'String'>
    readonly pageUrl: FieldRef<"ListeningItem", 'String'>
    readonly audioUrl: FieldRef<"ListeningItem", 'String'>
    readonly transcript: FieldRef<"ListeningItem", 'String'>
    readonly summary: FieldRef<"ListeningItem", 'String'>
    readonly level: FieldRef<"ListeningItem", 'String'>
    readonly publishedAt: FieldRef<"ListeningItem", 'DateTime'>
    readonly durationSec: FieldRef<"ListeningItem", 'Int'>
    readonly fetchedAt: FieldRef<"ListeningItem", 'DateTime'>
    readonly listenedAt: FieldRef<"ListeningItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListeningItem findUnique
   */
  export type ListeningItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * Filter, which ListeningItem to fetch.
     */
    where: ListeningItemWhereUniqueInput
  }

  /**
   * ListeningItem findUniqueOrThrow
   */
  export type ListeningItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * Filter, which ListeningItem to fetch.
     */
    where: ListeningItemWhereUniqueInput
  }

  /**
   * ListeningItem findFirst
   */
  export type ListeningItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * Filter, which ListeningItem to fetch.
     */
    where?: ListeningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningItems to fetch.
     */
    orderBy?: ListeningItemOrderByWithRelationInput | ListeningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListeningItems.
     */
    cursor?: ListeningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListeningItems.
     */
    distinct?: ListeningItemScalarFieldEnum | ListeningItemScalarFieldEnum[]
  }

  /**
   * ListeningItem findFirstOrThrow
   */
  export type ListeningItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * Filter, which ListeningItem to fetch.
     */
    where?: ListeningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningItems to fetch.
     */
    orderBy?: ListeningItemOrderByWithRelationInput | ListeningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListeningItems.
     */
    cursor?: ListeningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListeningItems.
     */
    distinct?: ListeningItemScalarFieldEnum | ListeningItemScalarFieldEnum[]
  }

  /**
   * ListeningItem findMany
   */
  export type ListeningItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * Filter, which ListeningItems to fetch.
     */
    where?: ListeningItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListeningItems to fetch.
     */
    orderBy?: ListeningItemOrderByWithRelationInput | ListeningItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListeningItems.
     */
    cursor?: ListeningItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListeningItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListeningItems.
     */
    skip?: number
    distinct?: ListeningItemScalarFieldEnum | ListeningItemScalarFieldEnum[]
  }

  /**
   * ListeningItem create
   */
  export type ListeningItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * The data needed to create a ListeningItem.
     */
    data: XOR<ListeningItemCreateInput, ListeningItemUncheckedCreateInput>
  }

  /**
   * ListeningItem createMany
   */
  export type ListeningItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListeningItems.
     */
    data: ListeningItemCreateManyInput | ListeningItemCreateManyInput[]
  }

  /**
   * ListeningItem createManyAndReturn
   */
  export type ListeningItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ListeningItems.
     */
    data: ListeningItemCreateManyInput | ListeningItemCreateManyInput[]
  }

  /**
   * ListeningItem update
   */
  export type ListeningItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * The data needed to update a ListeningItem.
     */
    data: XOR<ListeningItemUpdateInput, ListeningItemUncheckedUpdateInput>
    /**
     * Choose, which ListeningItem to update.
     */
    where: ListeningItemWhereUniqueInput
  }

  /**
   * ListeningItem updateMany
   */
  export type ListeningItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListeningItems.
     */
    data: XOR<ListeningItemUpdateManyMutationInput, ListeningItemUncheckedUpdateManyInput>
    /**
     * Filter which ListeningItems to update
     */
    where?: ListeningItemWhereInput
  }

  /**
   * ListeningItem upsert
   */
  export type ListeningItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * The filter to search for the ListeningItem to update in case it exists.
     */
    where: ListeningItemWhereUniqueInput
    /**
     * In case the ListeningItem found by the `where` argument doesn't exist, create a new ListeningItem with this data.
     */
    create: XOR<ListeningItemCreateInput, ListeningItemUncheckedCreateInput>
    /**
     * In case the ListeningItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListeningItemUpdateInput, ListeningItemUncheckedUpdateInput>
  }

  /**
   * ListeningItem delete
   */
  export type ListeningItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
    /**
     * Filter which ListeningItem to delete.
     */
    where: ListeningItemWhereUniqueInput
  }

  /**
   * ListeningItem deleteMany
   */
  export type ListeningItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListeningItems to delete
     */
    where?: ListeningItemWhereInput
  }

  /**
   * ListeningItem without action
   */
  export type ListeningItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListeningItem
     */
    select?: ListeningItemSelect<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    key: string
    value: string
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }


  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const settingWithKeyOnly = await prisma.setting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */ 
  interface SettingFieldRefs {
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'String'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WordScalarFieldEnum: {
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

  export type WordScalarFieldEnum = (typeof WordScalarFieldEnum)[keyof typeof WordScalarFieldEnum]


  export const WordProgressScalarFieldEnum: {
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

  export type WordProgressScalarFieldEnum = (typeof WordProgressScalarFieldEnum)[keyof typeof WordProgressScalarFieldEnum]


  export const NotebookItemScalarFieldEnum: {
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

  export type NotebookItemScalarFieldEnum = (typeof NotebookItemScalarFieldEnum)[keyof typeof NotebookItemScalarFieldEnum]


  export const StudySessionScalarFieldEnum: {
    id: 'id',
    kind: 'kind',
    minutes: 'minutes',
    pomodoros: 'pomodoros',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type StudySessionScalarFieldEnum = (typeof StudySessionScalarFieldEnum)[keyof typeof StudySessionScalarFieldEnum]


  export const DailyStatScalarFieldEnum: {
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

  export type DailyStatScalarFieldEnum = (typeof DailyStatScalarFieldEnum)[keyof typeof DailyStatScalarFieldEnum]


  export const ListeningDrillScalarFieldEnum: {
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

  export type ListeningDrillScalarFieldEnum = (typeof ListeningDrillScalarFieldEnum)[keyof typeof ListeningDrillScalarFieldEnum]


  export const WritingTemplateScalarFieldEnum: {
    id: 'id',
    category: 'category',
    title: 'title',
    summary: 'summary',
    body: 'body',
    phrases: 'phrases',
    starred: 'starred',
    sort: 'sort'
  };

  export type WritingTemplateScalarFieldEnum = (typeof WritingTemplateScalarFieldEnum)[keyof typeof WritingTemplateScalarFieldEnum]


  export const PaperScalarFieldEnum: {
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

  export type PaperScalarFieldEnum = (typeof PaperScalarFieldEnum)[keyof typeof PaperScalarFieldEnum]


  export const PaperAttemptScalarFieldEnum: {
    id: 'id',
    paperId: 'paperId',
    section: 'section',
    total: 'total',
    correct: 'correct',
    detail: 'detail',
    minutes: 'minutes',
    createdAt: 'createdAt'
  };

  export type PaperAttemptScalarFieldEnum = (typeof PaperAttemptScalarFieldEnum)[keyof typeof PaperAttemptScalarFieldEnum]


  export const DailyArticleScalarFieldEnum: {
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

  export type DailyArticleScalarFieldEnum = (typeof DailyArticleScalarFieldEnum)[keyof typeof DailyArticleScalarFieldEnum]


  export const ListeningItemScalarFieldEnum: {
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

  export type ListeningItemScalarFieldEnum = (typeof ListeningItemScalarFieldEnum)[keyof typeof ListeningItemScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type WordWhereInput = {
    AND?: WordWhereInput | WordWhereInput[]
    OR?: WordWhereInput[]
    NOT?: WordWhereInput | WordWhereInput[]
    id?: StringFilter<"Word"> | string
    text?: StringFilter<"Word"> | string
    rank?: IntFilter<"Word"> | number
    freq?: IntFilter<"Word"> | number
    ukPhone?: StringNullableFilter<"Word"> | string | null
    usPhone?: StringNullableFilter<"Word"> | string | null
    trans?: StringFilter<"Word"> | string
    defEn?: StringNullableFilter<"Word"> | string | null
    phrases?: StringFilter<"Word"> | string
    sents?: StringFilter<"Word"> | string
    exam?: StringFilter<"Word"> | string
    synos?: StringFilter<"Word"> | string
    relWords?: StringFilter<"Word"> | string
    mnemonic?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    updatedAt?: DateTimeFilter<"Word"> | Date | string
    progress?: XOR<WordProgressNullableRelationFilter, WordProgressWhereInput> | null
  }

  export type WordOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    rank?: SortOrder
    freq?: SortOrder
    ukPhone?: SortOrderInput | SortOrder
    usPhone?: SortOrderInput | SortOrder
    trans?: SortOrder
    defEn?: SortOrderInput | SortOrder
    phrases?: SortOrder
    sents?: SortOrder
    exam?: SortOrder
    synos?: SortOrder
    relWords?: SortOrder
    mnemonic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    progress?: WordProgressOrderByWithRelationInput
  }

  export type WordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    text?: string
    AND?: WordWhereInput | WordWhereInput[]
    OR?: WordWhereInput[]
    NOT?: WordWhereInput | WordWhereInput[]
    rank?: IntFilter<"Word"> | number
    freq?: IntFilter<"Word"> | number
    ukPhone?: StringNullableFilter<"Word"> | string | null
    usPhone?: StringNullableFilter<"Word"> | string | null
    trans?: StringFilter<"Word"> | string
    defEn?: StringNullableFilter<"Word"> | string | null
    phrases?: StringFilter<"Word"> | string
    sents?: StringFilter<"Word"> | string
    exam?: StringFilter<"Word"> | string
    synos?: StringFilter<"Word"> | string
    relWords?: StringFilter<"Word"> | string
    mnemonic?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    updatedAt?: DateTimeFilter<"Word"> | Date | string
    progress?: XOR<WordProgressNullableRelationFilter, WordProgressWhereInput> | null
  }, "id" | "text">

  export type WordOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    rank?: SortOrder
    freq?: SortOrder
    ukPhone?: SortOrderInput | SortOrder
    usPhone?: SortOrderInput | SortOrder
    trans?: SortOrder
    defEn?: SortOrderInput | SortOrder
    phrases?: SortOrder
    sents?: SortOrder
    exam?: SortOrder
    synos?: SortOrder
    relWords?: SortOrder
    mnemonic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WordCountOrderByAggregateInput
    _avg?: WordAvgOrderByAggregateInput
    _max?: WordMaxOrderByAggregateInput
    _min?: WordMinOrderByAggregateInput
    _sum?: WordSumOrderByAggregateInput
  }

  export type WordScalarWhereWithAggregatesInput = {
    AND?: WordScalarWhereWithAggregatesInput | WordScalarWhereWithAggregatesInput[]
    OR?: WordScalarWhereWithAggregatesInput[]
    NOT?: WordScalarWhereWithAggregatesInput | WordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Word"> | string
    text?: StringWithAggregatesFilter<"Word"> | string
    rank?: IntWithAggregatesFilter<"Word"> | number
    freq?: IntWithAggregatesFilter<"Word"> | number
    ukPhone?: StringNullableWithAggregatesFilter<"Word"> | string | null
    usPhone?: StringNullableWithAggregatesFilter<"Word"> | string | null
    trans?: StringWithAggregatesFilter<"Word"> | string
    defEn?: StringNullableWithAggregatesFilter<"Word"> | string | null
    phrases?: StringWithAggregatesFilter<"Word"> | string
    sents?: StringWithAggregatesFilter<"Word"> | string
    exam?: StringWithAggregatesFilter<"Word"> | string
    synos?: StringWithAggregatesFilter<"Word"> | string
    relWords?: StringWithAggregatesFilter<"Word"> | string
    mnemonic?: StringNullableWithAggregatesFilter<"Word"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Word"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Word"> | Date | string
  }

  export type WordProgressWhereInput = {
    AND?: WordProgressWhereInput | WordProgressWhereInput[]
    OR?: WordProgressWhereInput[]
    NOT?: WordProgressWhereInput | WordProgressWhereInput[]
    id?: StringFilter<"WordProgress"> | string
    wordId?: StringFilter<"WordProgress"> | string
    stage?: IntFilter<"WordProgress"> | number
    ease?: FloatFilter<"WordProgress"> | number
    dueAt?: DateTimeFilter<"WordProgress"> | Date | string
    reps?: IntFilter<"WordProgress"> | number
    lapses?: IntFilter<"WordProgress"> | number
    lastResult?: StringNullableFilter<"WordProgress"> | string | null
    recallLv?: IntFilter<"WordProgress"> | number
    spellLv?: IntFilter<"WordProgress"> | number
    createdAt?: DateTimeFilter<"WordProgress"> | Date | string
    updatedAt?: DateTimeFilter<"WordProgress"> | Date | string
    word?: XOR<WordRelationFilter, WordWhereInput>
  }

  export type WordProgressOrderByWithRelationInput = {
    id?: SortOrder
    wordId?: SortOrder
    stage?: SortOrder
    ease?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    lastResult?: SortOrderInput | SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    word?: WordOrderByWithRelationInput
  }

  export type WordProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    wordId?: string
    AND?: WordProgressWhereInput | WordProgressWhereInput[]
    OR?: WordProgressWhereInput[]
    NOT?: WordProgressWhereInput | WordProgressWhereInput[]
    stage?: IntFilter<"WordProgress"> | number
    ease?: FloatFilter<"WordProgress"> | number
    dueAt?: DateTimeFilter<"WordProgress"> | Date | string
    reps?: IntFilter<"WordProgress"> | number
    lapses?: IntFilter<"WordProgress"> | number
    lastResult?: StringNullableFilter<"WordProgress"> | string | null
    recallLv?: IntFilter<"WordProgress"> | number
    spellLv?: IntFilter<"WordProgress"> | number
    createdAt?: DateTimeFilter<"WordProgress"> | Date | string
    updatedAt?: DateTimeFilter<"WordProgress"> | Date | string
    word?: XOR<WordRelationFilter, WordWhereInput>
  }, "id" | "wordId">

  export type WordProgressOrderByWithAggregationInput = {
    id?: SortOrder
    wordId?: SortOrder
    stage?: SortOrder
    ease?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    lastResult?: SortOrderInput | SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WordProgressCountOrderByAggregateInput
    _avg?: WordProgressAvgOrderByAggregateInput
    _max?: WordProgressMaxOrderByAggregateInput
    _min?: WordProgressMinOrderByAggregateInput
    _sum?: WordProgressSumOrderByAggregateInput
  }

  export type WordProgressScalarWhereWithAggregatesInput = {
    AND?: WordProgressScalarWhereWithAggregatesInput | WordProgressScalarWhereWithAggregatesInput[]
    OR?: WordProgressScalarWhereWithAggregatesInput[]
    NOT?: WordProgressScalarWhereWithAggregatesInput | WordProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WordProgress"> | string
    wordId?: StringWithAggregatesFilter<"WordProgress"> | string
    stage?: IntWithAggregatesFilter<"WordProgress"> | number
    ease?: FloatWithAggregatesFilter<"WordProgress"> | number
    dueAt?: DateTimeWithAggregatesFilter<"WordProgress"> | Date | string
    reps?: IntWithAggregatesFilter<"WordProgress"> | number
    lapses?: IntWithAggregatesFilter<"WordProgress"> | number
    lastResult?: StringNullableWithAggregatesFilter<"WordProgress"> | string | null
    recallLv?: IntWithAggregatesFilter<"WordProgress"> | number
    spellLv?: IntWithAggregatesFilter<"WordProgress"> | number
    createdAt?: DateTimeWithAggregatesFilter<"WordProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WordProgress"> | Date | string
  }

  export type NotebookItemWhereInput = {
    AND?: NotebookItemWhereInput | NotebookItemWhereInput[]
    OR?: NotebookItemWhereInput[]
    NOT?: NotebookItemWhereInput | NotebookItemWhereInput[]
    id?: StringFilter<"NotebookItem"> | string
    kind?: StringFilter<"NotebookItem"> | string
    source?: StringFilter<"NotebookItem"> | string
    title?: StringFilter<"NotebookItem"> | string
    content?: StringFilter<"NotebookItem"> | string
    answer?: StringNullableFilter<"NotebookItem"> | string | null
    myAnswer?: StringNullableFilter<"NotebookItem"> | string | null
    note?: StringNullableFilter<"NotebookItem"> | string | null
    tags?: StringFilter<"NotebookItem"> | string
    refId?: StringNullableFilter<"NotebookItem"> | string | null
    stage?: IntFilter<"NotebookItem"> | number
    dueAt?: DateTimeNullableFilter<"NotebookItem"> | Date | string | null
    reps?: IntFilter<"NotebookItem"> | number
    lapses?: IntFilter<"NotebookItem"> | number
    createdAt?: DateTimeFilter<"NotebookItem"> | Date | string
    updatedAt?: DateTimeFilter<"NotebookItem"> | Date | string
  }

  export type NotebookItemOrderByWithRelationInput = {
    id?: SortOrder
    kind?: SortOrder
    source?: SortOrder
    title?: SortOrder
    content?: SortOrder
    answer?: SortOrderInput | SortOrder
    myAnswer?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    tags?: SortOrder
    refId?: SortOrderInput | SortOrder
    stage?: SortOrder
    dueAt?: SortOrderInput | SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotebookItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotebookItemWhereInput | NotebookItemWhereInput[]
    OR?: NotebookItemWhereInput[]
    NOT?: NotebookItemWhereInput | NotebookItemWhereInput[]
    kind?: StringFilter<"NotebookItem"> | string
    source?: StringFilter<"NotebookItem"> | string
    title?: StringFilter<"NotebookItem"> | string
    content?: StringFilter<"NotebookItem"> | string
    answer?: StringNullableFilter<"NotebookItem"> | string | null
    myAnswer?: StringNullableFilter<"NotebookItem"> | string | null
    note?: StringNullableFilter<"NotebookItem"> | string | null
    tags?: StringFilter<"NotebookItem"> | string
    refId?: StringNullableFilter<"NotebookItem"> | string | null
    stage?: IntFilter<"NotebookItem"> | number
    dueAt?: DateTimeNullableFilter<"NotebookItem"> | Date | string | null
    reps?: IntFilter<"NotebookItem"> | number
    lapses?: IntFilter<"NotebookItem"> | number
    createdAt?: DateTimeFilter<"NotebookItem"> | Date | string
    updatedAt?: DateTimeFilter<"NotebookItem"> | Date | string
  }, "id">

  export type NotebookItemOrderByWithAggregationInput = {
    id?: SortOrder
    kind?: SortOrder
    source?: SortOrder
    title?: SortOrder
    content?: SortOrder
    answer?: SortOrderInput | SortOrder
    myAnswer?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    tags?: SortOrder
    refId?: SortOrderInput | SortOrder
    stage?: SortOrder
    dueAt?: SortOrderInput | SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotebookItemCountOrderByAggregateInput
    _avg?: NotebookItemAvgOrderByAggregateInput
    _max?: NotebookItemMaxOrderByAggregateInput
    _min?: NotebookItemMinOrderByAggregateInput
    _sum?: NotebookItemSumOrderByAggregateInput
  }

  export type NotebookItemScalarWhereWithAggregatesInput = {
    AND?: NotebookItemScalarWhereWithAggregatesInput | NotebookItemScalarWhereWithAggregatesInput[]
    OR?: NotebookItemScalarWhereWithAggregatesInput[]
    NOT?: NotebookItemScalarWhereWithAggregatesInput | NotebookItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotebookItem"> | string
    kind?: StringWithAggregatesFilter<"NotebookItem"> | string
    source?: StringWithAggregatesFilter<"NotebookItem"> | string
    title?: StringWithAggregatesFilter<"NotebookItem"> | string
    content?: StringWithAggregatesFilter<"NotebookItem"> | string
    answer?: StringNullableWithAggregatesFilter<"NotebookItem"> | string | null
    myAnswer?: StringNullableWithAggregatesFilter<"NotebookItem"> | string | null
    note?: StringNullableWithAggregatesFilter<"NotebookItem"> | string | null
    tags?: StringWithAggregatesFilter<"NotebookItem"> | string
    refId?: StringNullableWithAggregatesFilter<"NotebookItem"> | string | null
    stage?: IntWithAggregatesFilter<"NotebookItem"> | number
    dueAt?: DateTimeNullableWithAggregatesFilter<"NotebookItem"> | Date | string | null
    reps?: IntWithAggregatesFilter<"NotebookItem"> | number
    lapses?: IntWithAggregatesFilter<"NotebookItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"NotebookItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotebookItem"> | Date | string
  }

  export type StudySessionWhereInput = {
    AND?: StudySessionWhereInput | StudySessionWhereInput[]
    OR?: StudySessionWhereInput[]
    NOT?: StudySessionWhereInput | StudySessionWhereInput[]
    id?: StringFilter<"StudySession"> | string
    kind?: StringFilter<"StudySession"> | string
    minutes?: IntFilter<"StudySession"> | number
    pomodoros?: IntFilter<"StudySession"> | number
    startedAt?: DateTimeFilter<"StudySession"> | Date | string
    endedAt?: DateTimeNullableFilter<"StudySession"> | Date | string | null
    note?: StringNullableFilter<"StudySession"> | string | null
    createdAt?: DateTimeFilter<"StudySession"> | Date | string
  }

  export type StudySessionOrderByWithRelationInput = {
    id?: SortOrder
    kind?: SortOrder
    minutes?: SortOrder
    pomodoros?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type StudySessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudySessionWhereInput | StudySessionWhereInput[]
    OR?: StudySessionWhereInput[]
    NOT?: StudySessionWhereInput | StudySessionWhereInput[]
    kind?: StringFilter<"StudySession"> | string
    minutes?: IntFilter<"StudySession"> | number
    pomodoros?: IntFilter<"StudySession"> | number
    startedAt?: DateTimeFilter<"StudySession"> | Date | string
    endedAt?: DateTimeNullableFilter<"StudySession"> | Date | string | null
    note?: StringNullableFilter<"StudySession"> | string | null
    createdAt?: DateTimeFilter<"StudySession"> | Date | string
  }, "id">

  export type StudySessionOrderByWithAggregationInput = {
    id?: SortOrder
    kind?: SortOrder
    minutes?: SortOrder
    pomodoros?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StudySessionCountOrderByAggregateInput
    _avg?: StudySessionAvgOrderByAggregateInput
    _max?: StudySessionMaxOrderByAggregateInput
    _min?: StudySessionMinOrderByAggregateInput
    _sum?: StudySessionSumOrderByAggregateInput
  }

  export type StudySessionScalarWhereWithAggregatesInput = {
    AND?: StudySessionScalarWhereWithAggregatesInput | StudySessionScalarWhereWithAggregatesInput[]
    OR?: StudySessionScalarWhereWithAggregatesInput[]
    NOT?: StudySessionScalarWhereWithAggregatesInput | StudySessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudySession"> | string
    kind?: StringWithAggregatesFilter<"StudySession"> | string
    minutes?: IntWithAggregatesFilter<"StudySession"> | number
    pomodoros?: IntWithAggregatesFilter<"StudySession"> | number
    startedAt?: DateTimeWithAggregatesFilter<"StudySession"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"StudySession"> | Date | string | null
    note?: StringNullableWithAggregatesFilter<"StudySession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StudySession"> | Date | string
  }

  export type DailyStatWhereInput = {
    AND?: DailyStatWhereInput | DailyStatWhereInput[]
    OR?: DailyStatWhereInput[]
    NOT?: DailyStatWhereInput | DailyStatWhereInput[]
    date?: StringFilter<"DailyStat"> | string
    minutes?: IntFilter<"DailyStat"> | number
    newWords?: IntFilter<"DailyStat"> | number
    reviews?: IntFilter<"DailyStat"> | number
    correct?: IntFilter<"DailyStat"> | number
    wrong?: IntFilter<"DailyStat"> | number
    pomodoros?: IntFilter<"DailyStat"> | number
    streak?: IntFilter<"DailyStat"> | number
    updatedAt?: DateTimeFilter<"DailyStat"> | Date | string
  }

  export type DailyStatOrderByWithRelationInput = {
    date?: SortOrder
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatWhereUniqueInput = Prisma.AtLeast<{
    date?: string
    AND?: DailyStatWhereInput | DailyStatWhereInput[]
    OR?: DailyStatWhereInput[]
    NOT?: DailyStatWhereInput | DailyStatWhereInput[]
    minutes?: IntFilter<"DailyStat"> | number
    newWords?: IntFilter<"DailyStat"> | number
    reviews?: IntFilter<"DailyStat"> | number
    correct?: IntFilter<"DailyStat"> | number
    wrong?: IntFilter<"DailyStat"> | number
    pomodoros?: IntFilter<"DailyStat"> | number
    streak?: IntFilter<"DailyStat"> | number
    updatedAt?: DateTimeFilter<"DailyStat"> | Date | string
  }, "date">

  export type DailyStatOrderByWithAggregationInput = {
    date?: SortOrder
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyStatCountOrderByAggregateInput
    _avg?: DailyStatAvgOrderByAggregateInput
    _max?: DailyStatMaxOrderByAggregateInput
    _min?: DailyStatMinOrderByAggregateInput
    _sum?: DailyStatSumOrderByAggregateInput
  }

  export type DailyStatScalarWhereWithAggregatesInput = {
    AND?: DailyStatScalarWhereWithAggregatesInput | DailyStatScalarWhereWithAggregatesInput[]
    OR?: DailyStatScalarWhereWithAggregatesInput[]
    NOT?: DailyStatScalarWhereWithAggregatesInput | DailyStatScalarWhereWithAggregatesInput[]
    date?: StringWithAggregatesFilter<"DailyStat"> | string
    minutes?: IntWithAggregatesFilter<"DailyStat"> | number
    newWords?: IntWithAggregatesFilter<"DailyStat"> | number
    reviews?: IntWithAggregatesFilter<"DailyStat"> | number
    correct?: IntWithAggregatesFilter<"DailyStat"> | number
    wrong?: IntWithAggregatesFilter<"DailyStat"> | number
    pomodoros?: IntWithAggregatesFilter<"DailyStat"> | number
    streak?: IntWithAggregatesFilter<"DailyStat"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"DailyStat"> | Date | string
  }

  export type ListeningDrillWhereInput = {
    AND?: ListeningDrillWhereInput | ListeningDrillWhereInput[]
    OR?: ListeningDrillWhereInput[]
    NOT?: ListeningDrillWhereInput | ListeningDrillWhereInput[]
    id?: StringFilter<"ListeningDrill"> | string
    title?: StringFilter<"ListeningDrill"> | string
    source?: StringFilter<"ListeningDrill"> | string
    refId?: StringNullableFilter<"ListeningDrill"> | string | null
    audioPath?: StringNullableFilter<"ListeningDrill"> | string | null
    sentences?: StringFilter<"ListeningDrill"> | string
    dictation?: StringNullableFilter<"ListeningDrill"> | string | null
    accuracy?: FloatNullableFilter<"ListeningDrill"> | number | null
    createdAt?: DateTimeFilter<"ListeningDrill"> | Date | string
    updatedAt?: DateTimeFilter<"ListeningDrill"> | Date | string
  }

  export type ListeningDrillOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    refId?: SortOrderInput | SortOrder
    audioPath?: SortOrderInput | SortOrder
    sentences?: SortOrder
    dictation?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListeningDrillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListeningDrillWhereInput | ListeningDrillWhereInput[]
    OR?: ListeningDrillWhereInput[]
    NOT?: ListeningDrillWhereInput | ListeningDrillWhereInput[]
    title?: StringFilter<"ListeningDrill"> | string
    source?: StringFilter<"ListeningDrill"> | string
    refId?: StringNullableFilter<"ListeningDrill"> | string | null
    audioPath?: StringNullableFilter<"ListeningDrill"> | string | null
    sentences?: StringFilter<"ListeningDrill"> | string
    dictation?: StringNullableFilter<"ListeningDrill"> | string | null
    accuracy?: FloatNullableFilter<"ListeningDrill"> | number | null
    createdAt?: DateTimeFilter<"ListeningDrill"> | Date | string
    updatedAt?: DateTimeFilter<"ListeningDrill"> | Date | string
  }, "id">

  export type ListeningDrillOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    refId?: SortOrderInput | SortOrder
    audioPath?: SortOrderInput | SortOrder
    sentences?: SortOrder
    dictation?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ListeningDrillCountOrderByAggregateInput
    _avg?: ListeningDrillAvgOrderByAggregateInput
    _max?: ListeningDrillMaxOrderByAggregateInput
    _min?: ListeningDrillMinOrderByAggregateInput
    _sum?: ListeningDrillSumOrderByAggregateInput
  }

  export type ListeningDrillScalarWhereWithAggregatesInput = {
    AND?: ListeningDrillScalarWhereWithAggregatesInput | ListeningDrillScalarWhereWithAggregatesInput[]
    OR?: ListeningDrillScalarWhereWithAggregatesInput[]
    NOT?: ListeningDrillScalarWhereWithAggregatesInput | ListeningDrillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ListeningDrill"> | string
    title?: StringWithAggregatesFilter<"ListeningDrill"> | string
    source?: StringWithAggregatesFilter<"ListeningDrill"> | string
    refId?: StringNullableWithAggregatesFilter<"ListeningDrill"> | string | null
    audioPath?: StringNullableWithAggregatesFilter<"ListeningDrill"> | string | null
    sentences?: StringWithAggregatesFilter<"ListeningDrill"> | string
    dictation?: StringNullableWithAggregatesFilter<"ListeningDrill"> | string | null
    accuracy?: FloatNullableWithAggregatesFilter<"ListeningDrill"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ListeningDrill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ListeningDrill"> | Date | string
  }

  export type WritingTemplateWhereInput = {
    AND?: WritingTemplateWhereInput | WritingTemplateWhereInput[]
    OR?: WritingTemplateWhereInput[]
    NOT?: WritingTemplateWhereInput | WritingTemplateWhereInput[]
    id?: StringFilter<"WritingTemplate"> | string
    category?: StringFilter<"WritingTemplate"> | string
    title?: StringFilter<"WritingTemplate"> | string
    summary?: StringFilter<"WritingTemplate"> | string
    body?: StringFilter<"WritingTemplate"> | string
    phrases?: StringFilter<"WritingTemplate"> | string
    starred?: BoolFilter<"WritingTemplate"> | boolean
    sort?: IntFilter<"WritingTemplate"> | number
  }

  export type WritingTemplateOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    body?: SortOrder
    phrases?: SortOrder
    starred?: SortOrder
    sort?: SortOrder
  }

  export type WritingTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WritingTemplateWhereInput | WritingTemplateWhereInput[]
    OR?: WritingTemplateWhereInput[]
    NOT?: WritingTemplateWhereInput | WritingTemplateWhereInput[]
    category?: StringFilter<"WritingTemplate"> | string
    title?: StringFilter<"WritingTemplate"> | string
    summary?: StringFilter<"WritingTemplate"> | string
    body?: StringFilter<"WritingTemplate"> | string
    phrases?: StringFilter<"WritingTemplate"> | string
    starred?: BoolFilter<"WritingTemplate"> | boolean
    sort?: IntFilter<"WritingTemplate"> | number
  }, "id">

  export type WritingTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    body?: SortOrder
    phrases?: SortOrder
    starred?: SortOrder
    sort?: SortOrder
    _count?: WritingTemplateCountOrderByAggregateInput
    _avg?: WritingTemplateAvgOrderByAggregateInput
    _max?: WritingTemplateMaxOrderByAggregateInput
    _min?: WritingTemplateMinOrderByAggregateInput
    _sum?: WritingTemplateSumOrderByAggregateInput
  }

  export type WritingTemplateScalarWhereWithAggregatesInput = {
    AND?: WritingTemplateScalarWhereWithAggregatesInput | WritingTemplateScalarWhereWithAggregatesInput[]
    OR?: WritingTemplateScalarWhereWithAggregatesInput[]
    NOT?: WritingTemplateScalarWhereWithAggregatesInput | WritingTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WritingTemplate"> | string
    category?: StringWithAggregatesFilter<"WritingTemplate"> | string
    title?: StringWithAggregatesFilter<"WritingTemplate"> | string
    summary?: StringWithAggregatesFilter<"WritingTemplate"> | string
    body?: StringWithAggregatesFilter<"WritingTemplate"> | string
    phrases?: StringWithAggregatesFilter<"WritingTemplate"> | string
    starred?: BoolWithAggregatesFilter<"WritingTemplate"> | boolean
    sort?: IntWithAggregatesFilter<"WritingTemplate"> | number
  }

  export type PaperWhereInput = {
    AND?: PaperWhereInput | PaperWhereInput[]
    OR?: PaperWhereInput[]
    NOT?: PaperWhereInput | PaperWhereInput[]
    id?: StringFilter<"Paper"> | string
    slug?: StringFilter<"Paper"> | string
    year?: IntFilter<"Paper"> | number
    month?: IntFilter<"Paper"> | number
    set?: StringFilter<"Paper"> | string
    label?: StringFilter<"Paper"> | string
    writing?: StringNullableFilter<"Paper"> | string | null
    writingModel?: StringNullableFilter<"Paper"> | string | null
    writingModelZh?: StringNullableFilter<"Paper"> | string | null
    translation?: StringNullableFilter<"Paper"> | string | null
    translationReference?: StringNullableFilter<"Paper"> | string | null
    subjective?: StringFilter<"Paper"> | string
    passages?: StringFilter<"Paper"> | string
    questions?: StringFilter<"Paper"> | string
    byPart?: StringFilter<"Paper"> | string
    questionCount?: IntFilter<"Paper"> | number
    audioUrl?: StringNullableFilter<"Paper"> | string | null
    audioHls?: StringNullableFilter<"Paper"> | string | null
    audioPieces?: StringFilter<"Paper"> | string
    listenedAt?: DateTimeNullableFilter<"Paper"> | Date | string | null
    source?: StringFilter<"Paper"> | string
    createdAt?: DateTimeFilter<"Paper"> | Date | string
    attempts?: PaperAttemptListRelationFilter
  }

  export type PaperOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    year?: SortOrder
    month?: SortOrder
    set?: SortOrder
    label?: SortOrder
    writing?: SortOrderInput | SortOrder
    writingModel?: SortOrderInput | SortOrder
    writingModelZh?: SortOrderInput | SortOrder
    translation?: SortOrderInput | SortOrder
    translationReference?: SortOrderInput | SortOrder
    subjective?: SortOrder
    passages?: SortOrder
    questions?: SortOrder
    byPart?: SortOrder
    questionCount?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    audioHls?: SortOrderInput | SortOrder
    audioPieces?: SortOrder
    listenedAt?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    attempts?: PaperAttemptOrderByRelationAggregateInput
  }

  export type PaperWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PaperWhereInput | PaperWhereInput[]
    OR?: PaperWhereInput[]
    NOT?: PaperWhereInput | PaperWhereInput[]
    year?: IntFilter<"Paper"> | number
    month?: IntFilter<"Paper"> | number
    set?: StringFilter<"Paper"> | string
    label?: StringFilter<"Paper"> | string
    writing?: StringNullableFilter<"Paper"> | string | null
    writingModel?: StringNullableFilter<"Paper"> | string | null
    writingModelZh?: StringNullableFilter<"Paper"> | string | null
    translation?: StringNullableFilter<"Paper"> | string | null
    translationReference?: StringNullableFilter<"Paper"> | string | null
    subjective?: StringFilter<"Paper"> | string
    passages?: StringFilter<"Paper"> | string
    questions?: StringFilter<"Paper"> | string
    byPart?: StringFilter<"Paper"> | string
    questionCount?: IntFilter<"Paper"> | number
    audioUrl?: StringNullableFilter<"Paper"> | string | null
    audioHls?: StringNullableFilter<"Paper"> | string | null
    audioPieces?: StringFilter<"Paper"> | string
    listenedAt?: DateTimeNullableFilter<"Paper"> | Date | string | null
    source?: StringFilter<"Paper"> | string
    createdAt?: DateTimeFilter<"Paper"> | Date | string
    attempts?: PaperAttemptListRelationFilter
  }, "id" | "slug">

  export type PaperOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    year?: SortOrder
    month?: SortOrder
    set?: SortOrder
    label?: SortOrder
    writing?: SortOrderInput | SortOrder
    writingModel?: SortOrderInput | SortOrder
    writingModelZh?: SortOrderInput | SortOrder
    translation?: SortOrderInput | SortOrder
    translationReference?: SortOrderInput | SortOrder
    subjective?: SortOrder
    passages?: SortOrder
    questions?: SortOrder
    byPart?: SortOrder
    questionCount?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    audioHls?: SortOrderInput | SortOrder
    audioPieces?: SortOrder
    listenedAt?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    _count?: PaperCountOrderByAggregateInput
    _avg?: PaperAvgOrderByAggregateInput
    _max?: PaperMaxOrderByAggregateInput
    _min?: PaperMinOrderByAggregateInput
    _sum?: PaperSumOrderByAggregateInput
  }

  export type PaperScalarWhereWithAggregatesInput = {
    AND?: PaperScalarWhereWithAggregatesInput | PaperScalarWhereWithAggregatesInput[]
    OR?: PaperScalarWhereWithAggregatesInput[]
    NOT?: PaperScalarWhereWithAggregatesInput | PaperScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Paper"> | string
    slug?: StringWithAggregatesFilter<"Paper"> | string
    year?: IntWithAggregatesFilter<"Paper"> | number
    month?: IntWithAggregatesFilter<"Paper"> | number
    set?: StringWithAggregatesFilter<"Paper"> | string
    label?: StringWithAggregatesFilter<"Paper"> | string
    writing?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    writingModel?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    writingModelZh?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    translation?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    translationReference?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    subjective?: StringWithAggregatesFilter<"Paper"> | string
    passages?: StringWithAggregatesFilter<"Paper"> | string
    questions?: StringWithAggregatesFilter<"Paper"> | string
    byPart?: StringWithAggregatesFilter<"Paper"> | string
    questionCount?: IntWithAggregatesFilter<"Paper"> | number
    audioUrl?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    audioHls?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    audioPieces?: StringWithAggregatesFilter<"Paper"> | string
    listenedAt?: DateTimeNullableWithAggregatesFilter<"Paper"> | Date | string | null
    source?: StringWithAggregatesFilter<"Paper"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Paper"> | Date | string
  }

  export type PaperAttemptWhereInput = {
    AND?: PaperAttemptWhereInput | PaperAttemptWhereInput[]
    OR?: PaperAttemptWhereInput[]
    NOT?: PaperAttemptWhereInput | PaperAttemptWhereInput[]
    id?: StringFilter<"PaperAttempt"> | string
    paperId?: StringFilter<"PaperAttempt"> | string
    section?: StringFilter<"PaperAttempt"> | string
    total?: IntFilter<"PaperAttempt"> | number
    correct?: IntFilter<"PaperAttempt"> | number
    detail?: StringFilter<"PaperAttempt"> | string
    minutes?: IntFilter<"PaperAttempt"> | number
    createdAt?: DateTimeFilter<"PaperAttempt"> | Date | string
    paper?: XOR<PaperRelationFilter, PaperWhereInput>
  }

  export type PaperAttemptOrderByWithRelationInput = {
    id?: SortOrder
    paperId?: SortOrder
    section?: SortOrder
    total?: SortOrder
    correct?: SortOrder
    detail?: SortOrder
    minutes?: SortOrder
    createdAt?: SortOrder
    paper?: PaperOrderByWithRelationInput
  }

  export type PaperAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaperAttemptWhereInput | PaperAttemptWhereInput[]
    OR?: PaperAttemptWhereInput[]
    NOT?: PaperAttemptWhereInput | PaperAttemptWhereInput[]
    paperId?: StringFilter<"PaperAttempt"> | string
    section?: StringFilter<"PaperAttempt"> | string
    total?: IntFilter<"PaperAttempt"> | number
    correct?: IntFilter<"PaperAttempt"> | number
    detail?: StringFilter<"PaperAttempt"> | string
    minutes?: IntFilter<"PaperAttempt"> | number
    createdAt?: DateTimeFilter<"PaperAttempt"> | Date | string
    paper?: XOR<PaperRelationFilter, PaperWhereInput>
  }, "id">

  export type PaperAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    paperId?: SortOrder
    section?: SortOrder
    total?: SortOrder
    correct?: SortOrder
    detail?: SortOrder
    minutes?: SortOrder
    createdAt?: SortOrder
    _count?: PaperAttemptCountOrderByAggregateInput
    _avg?: PaperAttemptAvgOrderByAggregateInput
    _max?: PaperAttemptMaxOrderByAggregateInput
    _min?: PaperAttemptMinOrderByAggregateInput
    _sum?: PaperAttemptSumOrderByAggregateInput
  }

  export type PaperAttemptScalarWhereWithAggregatesInput = {
    AND?: PaperAttemptScalarWhereWithAggregatesInput | PaperAttemptScalarWhereWithAggregatesInput[]
    OR?: PaperAttemptScalarWhereWithAggregatesInput[]
    NOT?: PaperAttemptScalarWhereWithAggregatesInput | PaperAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaperAttempt"> | string
    paperId?: StringWithAggregatesFilter<"PaperAttempt"> | string
    section?: StringWithAggregatesFilter<"PaperAttempt"> | string
    total?: IntWithAggregatesFilter<"PaperAttempt"> | number
    correct?: IntWithAggregatesFilter<"PaperAttempt"> | number
    detail?: StringWithAggregatesFilter<"PaperAttempt"> | string
    minutes?: IntWithAggregatesFilter<"PaperAttempt"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PaperAttempt"> | Date | string
  }

  export type DailyArticleWhereInput = {
    AND?: DailyArticleWhereInput | DailyArticleWhereInput[]
    OR?: DailyArticleWhereInput[]
    NOT?: DailyArticleWhereInput | DailyArticleWhereInput[]
    id?: StringFilter<"DailyArticle"> | string
    date?: StringFilter<"DailyArticle"> | string
    title?: StringFilter<"DailyArticle"> | string
    sourceUrl?: StringFilter<"DailyArticle"> | string
    paragraphs?: StringFilter<"DailyArticle"> | string
    audioPath?: StringNullableFilter<"DailyArticle"> | string | null
    vocab?: StringFilter<"DailyArticle"> | string
    quiz?: StringFilter<"DailyArticle"> | string
    translation?: StringFilter<"DailyArticle"> | string
    generatedBy?: StringFilter<"DailyArticle"> | string
    createdAt?: DateTimeFilter<"DailyArticle"> | Date | string
  }

  export type DailyArticleOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    paragraphs?: SortOrder
    audioPath?: SortOrderInput | SortOrder
    vocab?: SortOrder
    quiz?: SortOrder
    translation?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: string
    AND?: DailyArticleWhereInput | DailyArticleWhereInput[]
    OR?: DailyArticleWhereInput[]
    NOT?: DailyArticleWhereInput | DailyArticleWhereInput[]
    title?: StringFilter<"DailyArticle"> | string
    sourceUrl?: StringFilter<"DailyArticle"> | string
    paragraphs?: StringFilter<"DailyArticle"> | string
    audioPath?: StringNullableFilter<"DailyArticle"> | string | null
    vocab?: StringFilter<"DailyArticle"> | string
    quiz?: StringFilter<"DailyArticle"> | string
    translation?: StringFilter<"DailyArticle"> | string
    generatedBy?: StringFilter<"DailyArticle"> | string
    createdAt?: DateTimeFilter<"DailyArticle"> | Date | string
  }, "id" | "date">

  export type DailyArticleOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    paragraphs?: SortOrder
    audioPath?: SortOrderInput | SortOrder
    vocab?: SortOrder
    quiz?: SortOrder
    translation?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
    _count?: DailyArticleCountOrderByAggregateInput
    _max?: DailyArticleMaxOrderByAggregateInput
    _min?: DailyArticleMinOrderByAggregateInput
  }

  export type DailyArticleScalarWhereWithAggregatesInput = {
    AND?: DailyArticleScalarWhereWithAggregatesInput | DailyArticleScalarWhereWithAggregatesInput[]
    OR?: DailyArticleScalarWhereWithAggregatesInput[]
    NOT?: DailyArticleScalarWhereWithAggregatesInput | DailyArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyArticle"> | string
    date?: StringWithAggregatesFilter<"DailyArticle"> | string
    title?: StringWithAggregatesFilter<"DailyArticle"> | string
    sourceUrl?: StringWithAggregatesFilter<"DailyArticle"> | string
    paragraphs?: StringWithAggregatesFilter<"DailyArticle"> | string
    audioPath?: StringNullableWithAggregatesFilter<"DailyArticle"> | string | null
    vocab?: StringWithAggregatesFilter<"DailyArticle"> | string
    quiz?: StringWithAggregatesFilter<"DailyArticle"> | string
    translation?: StringWithAggregatesFilter<"DailyArticle"> | string
    generatedBy?: StringWithAggregatesFilter<"DailyArticle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DailyArticle"> | Date | string
  }

  export type ListeningItemWhereInput = {
    AND?: ListeningItemWhereInput | ListeningItemWhereInput[]
    OR?: ListeningItemWhereInput[]
    NOT?: ListeningItemWhereInput | ListeningItemWhereInput[]
    id?: StringFilter<"ListeningItem"> | string
    source?: StringFilter<"ListeningItem"> | string
    externalId?: StringFilter<"ListeningItem"> | string
    title?: StringFilter<"ListeningItem"> | string
    pageUrl?: StringFilter<"ListeningItem"> | string
    audioUrl?: StringFilter<"ListeningItem"> | string
    transcript?: StringFilter<"ListeningItem"> | string
    summary?: StringFilter<"ListeningItem"> | string
    level?: StringFilter<"ListeningItem"> | string
    publishedAt?: DateTimeNullableFilter<"ListeningItem"> | Date | string | null
    durationSec?: IntNullableFilter<"ListeningItem"> | number | null
    fetchedAt?: DateTimeFilter<"ListeningItem"> | Date | string
    listenedAt?: DateTimeNullableFilter<"ListeningItem"> | Date | string | null
  }

  export type ListeningItemOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    pageUrl?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    summary?: SortOrder
    level?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    durationSec?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    listenedAt?: SortOrderInput | SortOrder
  }

  export type ListeningItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    source_externalId?: ListeningItemSourceExternalIdCompoundUniqueInput
    AND?: ListeningItemWhereInput | ListeningItemWhereInput[]
    OR?: ListeningItemWhereInput[]
    NOT?: ListeningItemWhereInput | ListeningItemWhereInput[]
    source?: StringFilter<"ListeningItem"> | string
    externalId?: StringFilter<"ListeningItem"> | string
    title?: StringFilter<"ListeningItem"> | string
    pageUrl?: StringFilter<"ListeningItem"> | string
    audioUrl?: StringFilter<"ListeningItem"> | string
    transcript?: StringFilter<"ListeningItem"> | string
    summary?: StringFilter<"ListeningItem"> | string
    level?: StringFilter<"ListeningItem"> | string
    publishedAt?: DateTimeNullableFilter<"ListeningItem"> | Date | string | null
    durationSec?: IntNullableFilter<"ListeningItem"> | number | null
    fetchedAt?: DateTimeFilter<"ListeningItem"> | Date | string
    listenedAt?: DateTimeNullableFilter<"ListeningItem"> | Date | string | null
  }, "id" | "source_externalId">

  export type ListeningItemOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    pageUrl?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    summary?: SortOrder
    level?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    durationSec?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    listenedAt?: SortOrderInput | SortOrder
    _count?: ListeningItemCountOrderByAggregateInput
    _avg?: ListeningItemAvgOrderByAggregateInput
    _max?: ListeningItemMaxOrderByAggregateInput
    _min?: ListeningItemMinOrderByAggregateInput
    _sum?: ListeningItemSumOrderByAggregateInput
  }

  export type ListeningItemScalarWhereWithAggregatesInput = {
    AND?: ListeningItemScalarWhereWithAggregatesInput | ListeningItemScalarWhereWithAggregatesInput[]
    OR?: ListeningItemScalarWhereWithAggregatesInput[]
    NOT?: ListeningItemScalarWhereWithAggregatesInput | ListeningItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ListeningItem"> | string
    source?: StringWithAggregatesFilter<"ListeningItem"> | string
    externalId?: StringWithAggregatesFilter<"ListeningItem"> | string
    title?: StringWithAggregatesFilter<"ListeningItem"> | string
    pageUrl?: StringWithAggregatesFilter<"ListeningItem"> | string
    audioUrl?: StringWithAggregatesFilter<"ListeningItem"> | string
    transcript?: StringWithAggregatesFilter<"ListeningItem"> | string
    summary?: StringWithAggregatesFilter<"ListeningItem"> | string
    level?: StringWithAggregatesFilter<"ListeningItem"> | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"ListeningItem"> | Date | string | null
    durationSec?: IntNullableWithAggregatesFilter<"ListeningItem"> | number | null
    fetchedAt?: DateTimeWithAggregatesFilter<"ListeningItem"> | Date | string
    listenedAt?: DateTimeNullableWithAggregatesFilter<"ListeningItem"> | Date | string | null
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    key?: StringFilter<"Setting"> | string
    value?: StringFilter<"Setting"> | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: StringFilter<"Setting"> | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "key">

  export type SettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: StringWithAggregatesFilter<"Setting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type WordCreateInput = {
    id?: string
    text: string
    rank: number
    freq?: number
    ukPhone?: string | null
    usPhone?: string | null
    trans: string
    defEn?: string | null
    phrases: string
    sents: string
    exam: string
    synos: string
    relWords: string
    mnemonic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    progress?: WordProgressCreateNestedOneWithoutWordInput
  }

  export type WordUncheckedCreateInput = {
    id?: string
    text: string
    rank: number
    freq?: number
    ukPhone?: string | null
    usPhone?: string | null
    trans: string
    defEn?: string | null
    phrases: string
    sents: string
    exam: string
    synos: string
    relWords: string
    mnemonic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    progress?: WordProgressUncheckedCreateNestedOneWithoutWordInput
  }

  export type WordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    freq?: IntFieldUpdateOperationsInput | number
    ukPhone?: NullableStringFieldUpdateOperationsInput | string | null
    usPhone?: NullableStringFieldUpdateOperationsInput | string | null
    trans?: StringFieldUpdateOperationsInput | string
    defEn?: NullableStringFieldUpdateOperationsInput | string | null
    phrases?: StringFieldUpdateOperationsInput | string
    sents?: StringFieldUpdateOperationsInput | string
    exam?: StringFieldUpdateOperationsInput | string
    synos?: StringFieldUpdateOperationsInput | string
    relWords?: StringFieldUpdateOperationsInput | string
    mnemonic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: WordProgressUpdateOneWithoutWordNestedInput
  }

  export type WordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    freq?: IntFieldUpdateOperationsInput | number
    ukPhone?: NullableStringFieldUpdateOperationsInput | string | null
    usPhone?: NullableStringFieldUpdateOperationsInput | string | null
    trans?: StringFieldUpdateOperationsInput | string
    defEn?: NullableStringFieldUpdateOperationsInput | string | null
    phrases?: StringFieldUpdateOperationsInput | string
    sents?: StringFieldUpdateOperationsInput | string
    exam?: StringFieldUpdateOperationsInput | string
    synos?: StringFieldUpdateOperationsInput | string
    relWords?: StringFieldUpdateOperationsInput | string
    mnemonic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progress?: WordProgressUncheckedUpdateOneWithoutWordNestedInput
  }

  export type WordCreateManyInput = {
    id?: string
    text: string
    rank: number
    freq?: number
    ukPhone?: string | null
    usPhone?: string | null
    trans: string
    defEn?: string | null
    phrases: string
    sents: string
    exam: string
    synos: string
    relWords: string
    mnemonic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    freq?: IntFieldUpdateOperationsInput | number
    ukPhone?: NullableStringFieldUpdateOperationsInput | string | null
    usPhone?: NullableStringFieldUpdateOperationsInput | string | null
    trans?: StringFieldUpdateOperationsInput | string
    defEn?: NullableStringFieldUpdateOperationsInput | string | null
    phrases?: StringFieldUpdateOperationsInput | string
    sents?: StringFieldUpdateOperationsInput | string
    exam?: StringFieldUpdateOperationsInput | string
    synos?: StringFieldUpdateOperationsInput | string
    relWords?: StringFieldUpdateOperationsInput | string
    mnemonic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    freq?: IntFieldUpdateOperationsInput | number
    ukPhone?: NullableStringFieldUpdateOperationsInput | string | null
    usPhone?: NullableStringFieldUpdateOperationsInput | string | null
    trans?: StringFieldUpdateOperationsInput | string
    defEn?: NullableStringFieldUpdateOperationsInput | string | null
    phrases?: StringFieldUpdateOperationsInput | string
    sents?: StringFieldUpdateOperationsInput | string
    exam?: StringFieldUpdateOperationsInput | string
    synos?: StringFieldUpdateOperationsInput | string
    relWords?: StringFieldUpdateOperationsInput | string
    mnemonic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordProgressCreateInput = {
    id?: string
    stage?: number
    ease?: number
    dueAt?: Date | string
    reps?: number
    lapses?: number
    lastResult?: string | null
    recallLv?: number
    spellLv?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    word: WordCreateNestedOneWithoutProgressInput
  }

  export type WordProgressUncheckedCreateInput = {
    id?: string
    wordId: string
    stage?: number
    ease?: number
    dueAt?: Date | string
    reps?: number
    lapses?: number
    lastResult?: string | null
    recallLv?: number
    spellLv?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: IntFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    lastResult?: NullableStringFieldUpdateOperationsInput | string | null
    recallLv?: IntFieldUpdateOperationsInput | number
    spellLv?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    word?: WordUpdateOneRequiredWithoutProgressNestedInput
  }

  export type WordProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordId?: StringFieldUpdateOperationsInput | string
    stage?: IntFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    lastResult?: NullableStringFieldUpdateOperationsInput | string | null
    recallLv?: IntFieldUpdateOperationsInput | number
    spellLv?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordProgressCreateManyInput = {
    id?: string
    wordId: string
    stage?: number
    ease?: number
    dueAt?: Date | string
    reps?: number
    lapses?: number
    lastResult?: string | null
    recallLv?: number
    spellLv?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: IntFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    lastResult?: NullableStringFieldUpdateOperationsInput | string | null
    recallLv?: IntFieldUpdateOperationsInput | number
    spellLv?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordId?: StringFieldUpdateOperationsInput | string
    stage?: IntFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    lastResult?: NullableStringFieldUpdateOperationsInput | string | null
    recallLv?: IntFieldUpdateOperationsInput | number
    spellLv?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotebookItemCreateInput = {
    id?: string
    kind: string
    source?: string
    title: string
    content: string
    answer?: string | null
    myAnswer?: string | null
    note?: string | null
    tags?: string
    refId?: string | null
    stage?: number
    dueAt?: Date | string | null
    reps?: number
    lapses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotebookItemUncheckedCreateInput = {
    id?: string
    kind: string
    source?: string
    title: string
    content: string
    answer?: string | null
    myAnswer?: string | null
    note?: string | null
    tags?: string
    refId?: string | null
    stage?: number
    dueAt?: Date | string | null
    reps?: number
    lapses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotebookItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    myAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: IntFieldUpdateOperationsInput | number
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotebookItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    myAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: IntFieldUpdateOperationsInput | number
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotebookItemCreateManyInput = {
    id?: string
    kind: string
    source?: string
    title: string
    content: string
    answer?: string | null
    myAnswer?: string | null
    note?: string | null
    tags?: string
    refId?: string | null
    stage?: number
    dueAt?: Date | string | null
    reps?: number
    lapses?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotebookItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    myAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: IntFieldUpdateOperationsInput | number
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotebookItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    myAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: IntFieldUpdateOperationsInput | number
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudySessionCreateInput = {
    id?: string
    kind: string
    minutes: number
    pomodoros?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type StudySessionUncheckedCreateInput = {
    id?: string
    kind: string
    minutes: number
    pomodoros?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type StudySessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudySessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudySessionCreateManyInput = {
    id?: string
    kind: string
    minutes: number
    pomodoros?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type StudySessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudySessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatCreateInput = {
    date: string
    minutes?: number
    newWords?: number
    reviews?: number
    correct?: number
    wrong?: number
    pomodoros?: number
    streak?: number
    updatedAt?: Date | string
  }

  export type DailyStatUncheckedCreateInput = {
    date: string
    minutes?: number
    newWords?: number
    reviews?: number
    correct?: number
    wrong?: number
    pomodoros?: number
    streak?: number
    updatedAt?: Date | string
  }

  export type DailyStatUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    newWords?: IntFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    wrong?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatUncheckedUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    newWords?: IntFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    wrong?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatCreateManyInput = {
    date: string
    minutes?: number
    newWords?: number
    reviews?: number
    correct?: number
    wrong?: number
    pomodoros?: number
    streak?: number
    updatedAt?: Date | string
  }

  export type DailyStatUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    newWords?: IntFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    wrong?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatUncheckedUpdateManyInput = {
    date?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    newWords?: IntFieldUpdateOperationsInput | number
    reviews?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    wrong?: IntFieldUpdateOperationsInput | number
    pomodoros?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListeningDrillCreateInput = {
    id?: string
    title: string
    source?: string
    refId?: string | null
    audioPath?: string | null
    sentences: string
    dictation?: string | null
    accuracy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListeningDrillUncheckedCreateInput = {
    id?: string
    title: string
    source?: string
    refId?: string | null
    audioPath?: string | null
    sentences: string
    dictation?: string | null
    accuracy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListeningDrillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    sentences?: StringFieldUpdateOperationsInput | string
    dictation?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListeningDrillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    sentences?: StringFieldUpdateOperationsInput | string
    dictation?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListeningDrillCreateManyInput = {
    id?: string
    title: string
    source?: string
    refId?: string | null
    audioPath?: string | null
    sentences: string
    dictation?: string | null
    accuracy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListeningDrillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    sentences?: StringFieldUpdateOperationsInput | string
    dictation?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListeningDrillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    sentences?: StringFieldUpdateOperationsInput | string
    dictation?: NullableStringFieldUpdateOperationsInput | string | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WritingTemplateCreateInput = {
    id?: string
    category: string
    title: string
    summary?: string
    body: string
    phrases?: string
    starred?: boolean
    sort?: number
  }

  export type WritingTemplateUncheckedCreateInput = {
    id?: string
    category: string
    title: string
    summary?: string
    body: string
    phrases?: string
    starred?: boolean
    sort?: number
  }

  export type WritingTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    phrases?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type WritingTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    phrases?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type WritingTemplateCreateManyInput = {
    id?: string
    category: string
    title: string
    summary?: string
    body: string
    phrases?: string
    starred?: boolean
    sort?: number
  }

  export type WritingTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    phrases?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type WritingTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    phrases?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type PaperCreateInput = {
    id?: string
    slug: string
    year: number
    month: number
    set: string
    label?: string
    writing?: string | null
    writingModel?: string | null
    writingModelZh?: string | null
    translation?: string | null
    translationReference?: string | null
    subjective?: string
    passages?: string
    questions?: string
    byPart?: string
    questionCount?: number
    audioUrl?: string | null
    audioHls?: string | null
    audioPieces?: string
    listenedAt?: Date | string | null
    source?: string
    createdAt?: Date | string
    attempts?: PaperAttemptCreateNestedManyWithoutPaperInput
  }

  export type PaperUncheckedCreateInput = {
    id?: string
    slug: string
    year: number
    month: number
    set: string
    label?: string
    writing?: string | null
    writingModel?: string | null
    writingModelZh?: string | null
    translation?: string | null
    translationReference?: string | null
    subjective?: string
    passages?: string
    questions?: string
    byPart?: string
    questionCount?: number
    audioUrl?: string | null
    audioHls?: string | null
    audioPieces?: string
    listenedAt?: Date | string | null
    source?: string
    createdAt?: Date | string
    attempts?: PaperAttemptUncheckedCreateNestedManyWithoutPaperInput
  }

  export type PaperUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    set?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    writing?: NullableStringFieldUpdateOperationsInput | string | null
    writingModel?: NullableStringFieldUpdateOperationsInput | string | null
    writingModelZh?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    translationReference?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: StringFieldUpdateOperationsInput | string
    passages?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    byPart?: StringFieldUpdateOperationsInput | string
    questionCount?: IntFieldUpdateOperationsInput | number
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioHls?: NullableStringFieldUpdateOperationsInput | string | null
    audioPieces?: StringFieldUpdateOperationsInput | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: PaperAttemptUpdateManyWithoutPaperNestedInput
  }

  export type PaperUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    set?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    writing?: NullableStringFieldUpdateOperationsInput | string | null
    writingModel?: NullableStringFieldUpdateOperationsInput | string | null
    writingModelZh?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    translationReference?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: StringFieldUpdateOperationsInput | string
    passages?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    byPart?: StringFieldUpdateOperationsInput | string
    questionCount?: IntFieldUpdateOperationsInput | number
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioHls?: NullableStringFieldUpdateOperationsInput | string | null
    audioPieces?: StringFieldUpdateOperationsInput | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: PaperAttemptUncheckedUpdateManyWithoutPaperNestedInput
  }

  export type PaperCreateManyInput = {
    id?: string
    slug: string
    year: number
    month: number
    set: string
    label?: string
    writing?: string | null
    writingModel?: string | null
    writingModelZh?: string | null
    translation?: string | null
    translationReference?: string | null
    subjective?: string
    passages?: string
    questions?: string
    byPart?: string
    questionCount?: number
    audioUrl?: string | null
    audioHls?: string | null
    audioPieces?: string
    listenedAt?: Date | string | null
    source?: string
    createdAt?: Date | string
  }

  export type PaperUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    set?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    writing?: NullableStringFieldUpdateOperationsInput | string | null
    writingModel?: NullableStringFieldUpdateOperationsInput | string | null
    writingModelZh?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    translationReference?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: StringFieldUpdateOperationsInput | string
    passages?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    byPart?: StringFieldUpdateOperationsInput | string
    questionCount?: IntFieldUpdateOperationsInput | number
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioHls?: NullableStringFieldUpdateOperationsInput | string | null
    audioPieces?: StringFieldUpdateOperationsInput | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    set?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    writing?: NullableStringFieldUpdateOperationsInput | string | null
    writingModel?: NullableStringFieldUpdateOperationsInput | string | null
    writingModelZh?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    translationReference?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: StringFieldUpdateOperationsInput | string
    passages?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    byPart?: StringFieldUpdateOperationsInput | string
    questionCount?: IntFieldUpdateOperationsInput | number
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioHls?: NullableStringFieldUpdateOperationsInput | string | null
    audioPieces?: StringFieldUpdateOperationsInput | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptCreateInput = {
    id?: string
    section: string
    total: number
    correct: number
    detail?: string
    minutes?: number
    createdAt?: Date | string
    paper: PaperCreateNestedOneWithoutAttemptsInput
  }

  export type PaperAttemptUncheckedCreateInput = {
    id?: string
    paperId: string
    section: string
    total: number
    correct: number
    detail?: string
    minutes?: number
    createdAt?: Date | string
  }

  export type PaperAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paper?: PaperUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type PaperAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptCreateManyInput = {
    id?: string
    paperId: string
    section: string
    total: number
    correct: number
    detail?: string
    minutes?: number
    createdAt?: Date | string
  }

  export type PaperAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyArticleCreateInput = {
    id?: string
    date: string
    title: string
    sourceUrl?: string
    paragraphs: string
    audioPath?: string | null
    vocab?: string
    quiz?: string
    translation?: string
    generatedBy?: string
    createdAt?: Date | string
  }

  export type DailyArticleUncheckedCreateInput = {
    id?: string
    date: string
    title: string
    sourceUrl?: string
    paragraphs: string
    audioPath?: string | null
    vocab?: string
    quiz?: string
    translation?: string
    generatedBy?: string
    createdAt?: Date | string
  }

  export type DailyArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    paragraphs?: StringFieldUpdateOperationsInput | string
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    vocab?: StringFieldUpdateOperationsInput | string
    quiz?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    paragraphs?: StringFieldUpdateOperationsInput | string
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    vocab?: StringFieldUpdateOperationsInput | string
    quiz?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyArticleCreateManyInput = {
    id?: string
    date: string
    title: string
    sourceUrl?: string
    paragraphs: string
    audioPath?: string | null
    vocab?: string
    quiz?: string
    translation?: string
    generatedBy?: string
    createdAt?: Date | string
  }

  export type DailyArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    paragraphs?: StringFieldUpdateOperationsInput | string
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    vocab?: StringFieldUpdateOperationsInput | string
    quiz?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    paragraphs?: StringFieldUpdateOperationsInput | string
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    vocab?: StringFieldUpdateOperationsInput | string
    quiz?: StringFieldUpdateOperationsInput | string
    translation?: StringFieldUpdateOperationsInput | string
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListeningItemCreateInput = {
    id?: string
    source: string
    externalId: string
    title: string
    pageUrl: string
    audioUrl: string
    transcript?: string
    summary?: string
    level?: string
    publishedAt?: Date | string | null
    durationSec?: number | null
    fetchedAt?: Date | string
    listenedAt?: Date | string | null
  }

  export type ListeningItemUncheckedCreateInput = {
    id?: string
    source: string
    externalId: string
    title: string
    pageUrl: string
    audioUrl: string
    transcript?: string
    summary?: string
    level?: string
    publishedAt?: Date | string | null
    durationSec?: number | null
    fetchedAt?: Date | string
    listenedAt?: Date | string | null
  }

  export type ListeningItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pageUrl?: StringFieldUpdateOperationsInput | string
    audioUrl?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListeningItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pageUrl?: StringFieldUpdateOperationsInput | string
    audioUrl?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListeningItemCreateManyInput = {
    id?: string
    source: string
    externalId: string
    title: string
    pageUrl: string
    audioUrl: string
    transcript?: string
    summary?: string
    level?: string
    publishedAt?: Date | string | null
    durationSec?: number | null
    fetchedAt?: Date | string
    listenedAt?: Date | string | null
  }

  export type ListeningItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pageUrl?: StringFieldUpdateOperationsInput | string
    audioUrl?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListeningItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pageUrl?: StringFieldUpdateOperationsInput | string
    audioUrl?: StringFieldUpdateOperationsInput | string
    transcript?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SettingCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WordProgressNullableRelationFilter = {
    is?: WordProgressWhereInput | null
    isNot?: WordProgressWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WordCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    rank?: SortOrder
    freq?: SortOrder
    ukPhone?: SortOrder
    usPhone?: SortOrder
    trans?: SortOrder
    defEn?: SortOrder
    phrases?: SortOrder
    sents?: SortOrder
    exam?: SortOrder
    synos?: SortOrder
    relWords?: SortOrder
    mnemonic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordAvgOrderByAggregateInput = {
    rank?: SortOrder
    freq?: SortOrder
  }

  export type WordMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    rank?: SortOrder
    freq?: SortOrder
    ukPhone?: SortOrder
    usPhone?: SortOrder
    trans?: SortOrder
    defEn?: SortOrder
    phrases?: SortOrder
    sents?: SortOrder
    exam?: SortOrder
    synos?: SortOrder
    relWords?: SortOrder
    mnemonic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    rank?: SortOrder
    freq?: SortOrder
    ukPhone?: SortOrder
    usPhone?: SortOrder
    trans?: SortOrder
    defEn?: SortOrder
    phrases?: SortOrder
    sents?: SortOrder
    exam?: SortOrder
    synos?: SortOrder
    relWords?: SortOrder
    mnemonic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordSumOrderByAggregateInput = {
    rank?: SortOrder
    freq?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WordRelationFilter = {
    is?: WordWhereInput
    isNot?: WordWhereInput
  }

  export type WordProgressCountOrderByAggregateInput = {
    id?: SortOrder
    wordId?: SortOrder
    stage?: SortOrder
    ease?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    lastResult?: SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordProgressAvgOrderByAggregateInput = {
    stage?: SortOrder
    ease?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
  }

  export type WordProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    wordId?: SortOrder
    stage?: SortOrder
    ease?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    lastResult?: SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordProgressMinOrderByAggregateInput = {
    id?: SortOrder
    wordId?: SortOrder
    stage?: SortOrder
    ease?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    lastResult?: SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordProgressSumOrderByAggregateInput = {
    stage?: SortOrder
    ease?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    recallLv?: SortOrder
    spellLv?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NotebookItemCountOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    source?: SortOrder
    title?: SortOrder
    content?: SortOrder
    answer?: SortOrder
    myAnswer?: SortOrder
    note?: SortOrder
    tags?: SortOrder
    refId?: SortOrder
    stage?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotebookItemAvgOrderByAggregateInput = {
    stage?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
  }

  export type NotebookItemMaxOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    source?: SortOrder
    title?: SortOrder
    content?: SortOrder
    answer?: SortOrder
    myAnswer?: SortOrder
    note?: SortOrder
    tags?: SortOrder
    refId?: SortOrder
    stage?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotebookItemMinOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    source?: SortOrder
    title?: SortOrder
    content?: SortOrder
    answer?: SortOrder
    myAnswer?: SortOrder
    note?: SortOrder
    tags?: SortOrder
    refId?: SortOrder
    stage?: SortOrder
    dueAt?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotebookItemSumOrderByAggregateInput = {
    stage?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StudySessionCountOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    minutes?: SortOrder
    pomodoros?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type StudySessionAvgOrderByAggregateInput = {
    minutes?: SortOrder
    pomodoros?: SortOrder
  }

  export type StudySessionMaxOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    minutes?: SortOrder
    pomodoros?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type StudySessionMinOrderByAggregateInput = {
    id?: SortOrder
    kind?: SortOrder
    minutes?: SortOrder
    pomodoros?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type StudySessionSumOrderByAggregateInput = {
    minutes?: SortOrder
    pomodoros?: SortOrder
  }

  export type DailyStatCountOrderByAggregateInput = {
    date?: SortOrder
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatAvgOrderByAggregateInput = {
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
  }

  export type DailyStatMaxOrderByAggregateInput = {
    date?: SortOrder
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatMinOrderByAggregateInput = {
    date?: SortOrder
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatSumOrderByAggregateInput = {
    minutes?: SortOrder
    newWords?: SortOrder
    reviews?: SortOrder
    correct?: SortOrder
    wrong?: SortOrder
    pomodoros?: SortOrder
    streak?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ListeningDrillCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    refId?: SortOrder
    audioPath?: SortOrder
    sentences?: SortOrder
    dictation?: SortOrder
    accuracy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListeningDrillAvgOrderByAggregateInput = {
    accuracy?: SortOrder
  }

  export type ListeningDrillMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    refId?: SortOrder
    audioPath?: SortOrder
    sentences?: SortOrder
    dictation?: SortOrder
    accuracy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListeningDrillMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    refId?: SortOrder
    audioPath?: SortOrder
    sentences?: SortOrder
    dictation?: SortOrder
    accuracy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListeningDrillSumOrderByAggregateInput = {
    accuracy?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type WritingTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    body?: SortOrder
    phrases?: SortOrder
    starred?: SortOrder
    sort?: SortOrder
  }

  export type WritingTemplateAvgOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type WritingTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    body?: SortOrder
    phrases?: SortOrder
    starred?: SortOrder
    sort?: SortOrder
  }

  export type WritingTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    body?: SortOrder
    phrases?: SortOrder
    starred?: SortOrder
    sort?: SortOrder
  }

  export type WritingTemplateSumOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PaperAttemptListRelationFilter = {
    every?: PaperAttemptWhereInput
    some?: PaperAttemptWhereInput
    none?: PaperAttemptWhereInput
  }

  export type PaperAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaperCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    year?: SortOrder
    month?: SortOrder
    set?: SortOrder
    label?: SortOrder
    writing?: SortOrder
    writingModel?: SortOrder
    writingModelZh?: SortOrder
    translation?: SortOrder
    translationReference?: SortOrder
    subjective?: SortOrder
    passages?: SortOrder
    questions?: SortOrder
    byPart?: SortOrder
    questionCount?: SortOrder
    audioUrl?: SortOrder
    audioHls?: SortOrder
    audioPieces?: SortOrder
    listenedAt?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type PaperAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    questionCount?: SortOrder
  }

  export type PaperMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    year?: SortOrder
    month?: SortOrder
    set?: SortOrder
    label?: SortOrder
    writing?: SortOrder
    writingModel?: SortOrder
    writingModelZh?: SortOrder
    translation?: SortOrder
    translationReference?: SortOrder
    subjective?: SortOrder
    passages?: SortOrder
    questions?: SortOrder
    byPart?: SortOrder
    questionCount?: SortOrder
    audioUrl?: SortOrder
    audioHls?: SortOrder
    audioPieces?: SortOrder
    listenedAt?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type PaperMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    year?: SortOrder
    month?: SortOrder
    set?: SortOrder
    label?: SortOrder
    writing?: SortOrder
    writingModel?: SortOrder
    writingModelZh?: SortOrder
    translation?: SortOrder
    translationReference?: SortOrder
    subjective?: SortOrder
    passages?: SortOrder
    questions?: SortOrder
    byPart?: SortOrder
    questionCount?: SortOrder
    audioUrl?: SortOrder
    audioHls?: SortOrder
    audioPieces?: SortOrder
    listenedAt?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type PaperSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    questionCount?: SortOrder
  }

  export type PaperRelationFilter = {
    is?: PaperWhereInput
    isNot?: PaperWhereInput
  }

  export type PaperAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    section?: SortOrder
    total?: SortOrder
    correct?: SortOrder
    detail?: SortOrder
    minutes?: SortOrder
    createdAt?: SortOrder
  }

  export type PaperAttemptAvgOrderByAggregateInput = {
    total?: SortOrder
    correct?: SortOrder
    minutes?: SortOrder
  }

  export type PaperAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    section?: SortOrder
    total?: SortOrder
    correct?: SortOrder
    detail?: SortOrder
    minutes?: SortOrder
    createdAt?: SortOrder
  }

  export type PaperAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    section?: SortOrder
    total?: SortOrder
    correct?: SortOrder
    detail?: SortOrder
    minutes?: SortOrder
    createdAt?: SortOrder
  }

  export type PaperAttemptSumOrderByAggregateInput = {
    total?: SortOrder
    correct?: SortOrder
    minutes?: SortOrder
  }

  export type DailyArticleCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    paragraphs?: SortOrder
    audioPath?: SortOrder
    vocab?: SortOrder
    quiz?: SortOrder
    translation?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    paragraphs?: SortOrder
    audioPath?: SortOrder
    vocab?: SortOrder
    quiz?: SortOrder
    translation?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyArticleMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    paragraphs?: SortOrder
    audioPath?: SortOrder
    vocab?: SortOrder
    quiz?: SortOrder
    translation?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ListeningItemSourceExternalIdCompoundUniqueInput = {
    source: string
    externalId: string
  }

  export type ListeningItemCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    pageUrl?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    summary?: SortOrder
    level?: SortOrder
    publishedAt?: SortOrder
    durationSec?: SortOrder
    fetchedAt?: SortOrder
    listenedAt?: SortOrder
  }

  export type ListeningItemAvgOrderByAggregateInput = {
    durationSec?: SortOrder
  }

  export type ListeningItemMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    pageUrl?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    summary?: SortOrder
    level?: SortOrder
    publishedAt?: SortOrder
    durationSec?: SortOrder
    fetchedAt?: SortOrder
    listenedAt?: SortOrder
  }

  export type ListeningItemMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    title?: SortOrder
    pageUrl?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    summary?: SortOrder
    level?: SortOrder
    publishedAt?: SortOrder
    durationSec?: SortOrder
    fetchedAt?: SortOrder
    listenedAt?: SortOrder
  }

  export type ListeningItemSumOrderByAggregateInput = {
    durationSec?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordProgressCreateNestedOneWithoutWordInput = {
    create?: XOR<WordProgressCreateWithoutWordInput, WordProgressUncheckedCreateWithoutWordInput>
    connectOrCreate?: WordProgressCreateOrConnectWithoutWordInput
    connect?: WordProgressWhereUniqueInput
  }

  export type WordProgressUncheckedCreateNestedOneWithoutWordInput = {
    create?: XOR<WordProgressCreateWithoutWordInput, WordProgressUncheckedCreateWithoutWordInput>
    connectOrCreate?: WordProgressCreateOrConnectWithoutWordInput
    connect?: WordProgressWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WordProgressUpdateOneWithoutWordNestedInput = {
    create?: XOR<WordProgressCreateWithoutWordInput, WordProgressUncheckedCreateWithoutWordInput>
    connectOrCreate?: WordProgressCreateOrConnectWithoutWordInput
    upsert?: WordProgressUpsertWithoutWordInput
    disconnect?: WordProgressWhereInput | boolean
    delete?: WordProgressWhereInput | boolean
    connect?: WordProgressWhereUniqueInput
    update?: XOR<XOR<WordProgressUpdateToOneWithWhereWithoutWordInput, WordProgressUpdateWithoutWordInput>, WordProgressUncheckedUpdateWithoutWordInput>
  }

  export type WordProgressUncheckedUpdateOneWithoutWordNestedInput = {
    create?: XOR<WordProgressCreateWithoutWordInput, WordProgressUncheckedCreateWithoutWordInput>
    connectOrCreate?: WordProgressCreateOrConnectWithoutWordInput
    upsert?: WordProgressUpsertWithoutWordInput
    disconnect?: WordProgressWhereInput | boolean
    delete?: WordProgressWhereInput | boolean
    connect?: WordProgressWhereUniqueInput
    update?: XOR<XOR<WordProgressUpdateToOneWithWhereWithoutWordInput, WordProgressUpdateWithoutWordInput>, WordProgressUncheckedUpdateWithoutWordInput>
  }

  export type WordCreateNestedOneWithoutProgressInput = {
    create?: XOR<WordCreateWithoutProgressInput, WordUncheckedCreateWithoutProgressInput>
    connectOrCreate?: WordCreateOrConnectWithoutProgressInput
    connect?: WordWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WordUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<WordCreateWithoutProgressInput, WordUncheckedCreateWithoutProgressInput>
    connectOrCreate?: WordCreateOrConnectWithoutProgressInput
    upsert?: WordUpsertWithoutProgressInput
    connect?: WordWhereUniqueInput
    update?: XOR<XOR<WordUpdateToOneWithWhereWithoutProgressInput, WordUpdateWithoutProgressInput>, WordUncheckedUpdateWithoutProgressInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PaperAttemptCreateNestedManyWithoutPaperInput = {
    create?: XOR<PaperAttemptCreateWithoutPaperInput, PaperAttemptUncheckedCreateWithoutPaperInput> | PaperAttemptCreateWithoutPaperInput[] | PaperAttemptUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: PaperAttemptCreateOrConnectWithoutPaperInput | PaperAttemptCreateOrConnectWithoutPaperInput[]
    createMany?: PaperAttemptCreateManyPaperInputEnvelope
    connect?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
  }

  export type PaperAttemptUncheckedCreateNestedManyWithoutPaperInput = {
    create?: XOR<PaperAttemptCreateWithoutPaperInput, PaperAttemptUncheckedCreateWithoutPaperInput> | PaperAttemptCreateWithoutPaperInput[] | PaperAttemptUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: PaperAttemptCreateOrConnectWithoutPaperInput | PaperAttemptCreateOrConnectWithoutPaperInput[]
    createMany?: PaperAttemptCreateManyPaperInputEnvelope
    connect?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
  }

  export type PaperAttemptUpdateManyWithoutPaperNestedInput = {
    create?: XOR<PaperAttemptCreateWithoutPaperInput, PaperAttemptUncheckedCreateWithoutPaperInput> | PaperAttemptCreateWithoutPaperInput[] | PaperAttemptUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: PaperAttemptCreateOrConnectWithoutPaperInput | PaperAttemptCreateOrConnectWithoutPaperInput[]
    upsert?: PaperAttemptUpsertWithWhereUniqueWithoutPaperInput | PaperAttemptUpsertWithWhereUniqueWithoutPaperInput[]
    createMany?: PaperAttemptCreateManyPaperInputEnvelope
    set?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    disconnect?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    delete?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    connect?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    update?: PaperAttemptUpdateWithWhereUniqueWithoutPaperInput | PaperAttemptUpdateWithWhereUniqueWithoutPaperInput[]
    updateMany?: PaperAttemptUpdateManyWithWhereWithoutPaperInput | PaperAttemptUpdateManyWithWhereWithoutPaperInput[]
    deleteMany?: PaperAttemptScalarWhereInput | PaperAttemptScalarWhereInput[]
  }

  export type PaperAttemptUncheckedUpdateManyWithoutPaperNestedInput = {
    create?: XOR<PaperAttemptCreateWithoutPaperInput, PaperAttemptUncheckedCreateWithoutPaperInput> | PaperAttemptCreateWithoutPaperInput[] | PaperAttemptUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: PaperAttemptCreateOrConnectWithoutPaperInput | PaperAttemptCreateOrConnectWithoutPaperInput[]
    upsert?: PaperAttemptUpsertWithWhereUniqueWithoutPaperInput | PaperAttemptUpsertWithWhereUniqueWithoutPaperInput[]
    createMany?: PaperAttemptCreateManyPaperInputEnvelope
    set?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    disconnect?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    delete?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    connect?: PaperAttemptWhereUniqueInput | PaperAttemptWhereUniqueInput[]
    update?: PaperAttemptUpdateWithWhereUniqueWithoutPaperInput | PaperAttemptUpdateWithWhereUniqueWithoutPaperInput[]
    updateMany?: PaperAttemptUpdateManyWithWhereWithoutPaperInput | PaperAttemptUpdateManyWithWhereWithoutPaperInput[]
    deleteMany?: PaperAttemptScalarWhereInput | PaperAttemptScalarWhereInput[]
  }

  export type PaperCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<PaperCreateWithoutAttemptsInput, PaperUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: PaperCreateOrConnectWithoutAttemptsInput
    connect?: PaperWhereUniqueInput
  }

  export type PaperUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<PaperCreateWithoutAttemptsInput, PaperUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: PaperCreateOrConnectWithoutAttemptsInput
    upsert?: PaperUpsertWithoutAttemptsInput
    connect?: PaperWhereUniqueInput
    update?: XOR<XOR<PaperUpdateToOneWithWhereWithoutAttemptsInput, PaperUpdateWithoutAttemptsInput>, PaperUncheckedUpdateWithoutAttemptsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type WordProgressCreateWithoutWordInput = {
    id?: string
    stage?: number
    ease?: number
    dueAt?: Date | string
    reps?: number
    lapses?: number
    lastResult?: string | null
    recallLv?: number
    spellLv?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordProgressUncheckedCreateWithoutWordInput = {
    id?: string
    stage?: number
    ease?: number
    dueAt?: Date | string
    reps?: number
    lapses?: number
    lastResult?: string | null
    recallLv?: number
    spellLv?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordProgressCreateOrConnectWithoutWordInput = {
    where: WordProgressWhereUniqueInput
    create: XOR<WordProgressCreateWithoutWordInput, WordProgressUncheckedCreateWithoutWordInput>
  }

  export type WordProgressUpsertWithoutWordInput = {
    update: XOR<WordProgressUpdateWithoutWordInput, WordProgressUncheckedUpdateWithoutWordInput>
    create: XOR<WordProgressCreateWithoutWordInput, WordProgressUncheckedCreateWithoutWordInput>
    where?: WordProgressWhereInput
  }

  export type WordProgressUpdateToOneWithWhereWithoutWordInput = {
    where?: WordProgressWhereInput
    data: XOR<WordProgressUpdateWithoutWordInput, WordProgressUncheckedUpdateWithoutWordInput>
  }

  export type WordProgressUpdateWithoutWordInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: IntFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    lastResult?: NullableStringFieldUpdateOperationsInput | string | null
    recallLv?: IntFieldUpdateOperationsInput | number
    spellLv?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordProgressUncheckedUpdateWithoutWordInput = {
    id?: StringFieldUpdateOperationsInput | string
    stage?: IntFieldUpdateOperationsInput | number
    ease?: FloatFieldUpdateOperationsInput | number
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    lastResult?: NullableStringFieldUpdateOperationsInput | string | null
    recallLv?: IntFieldUpdateOperationsInput | number
    spellLv?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordCreateWithoutProgressInput = {
    id?: string
    text: string
    rank: number
    freq?: number
    ukPhone?: string | null
    usPhone?: string | null
    trans: string
    defEn?: string | null
    phrases: string
    sents: string
    exam: string
    synos: string
    relWords: string
    mnemonic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordUncheckedCreateWithoutProgressInput = {
    id?: string
    text: string
    rank: number
    freq?: number
    ukPhone?: string | null
    usPhone?: string | null
    trans: string
    defEn?: string | null
    phrases: string
    sents: string
    exam: string
    synos: string
    relWords: string
    mnemonic?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordCreateOrConnectWithoutProgressInput = {
    where: WordWhereUniqueInput
    create: XOR<WordCreateWithoutProgressInput, WordUncheckedCreateWithoutProgressInput>
  }

  export type WordUpsertWithoutProgressInput = {
    update: XOR<WordUpdateWithoutProgressInput, WordUncheckedUpdateWithoutProgressInput>
    create: XOR<WordCreateWithoutProgressInput, WordUncheckedCreateWithoutProgressInput>
    where?: WordWhereInput
  }

  export type WordUpdateToOneWithWhereWithoutProgressInput = {
    where?: WordWhereInput
    data: XOR<WordUpdateWithoutProgressInput, WordUncheckedUpdateWithoutProgressInput>
  }

  export type WordUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    freq?: IntFieldUpdateOperationsInput | number
    ukPhone?: NullableStringFieldUpdateOperationsInput | string | null
    usPhone?: NullableStringFieldUpdateOperationsInput | string | null
    trans?: StringFieldUpdateOperationsInput | string
    defEn?: NullableStringFieldUpdateOperationsInput | string | null
    phrases?: StringFieldUpdateOperationsInput | string
    sents?: StringFieldUpdateOperationsInput | string
    exam?: StringFieldUpdateOperationsInput | string
    synos?: StringFieldUpdateOperationsInput | string
    relWords?: StringFieldUpdateOperationsInput | string
    mnemonic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    freq?: IntFieldUpdateOperationsInput | number
    ukPhone?: NullableStringFieldUpdateOperationsInput | string | null
    usPhone?: NullableStringFieldUpdateOperationsInput | string | null
    trans?: StringFieldUpdateOperationsInput | string
    defEn?: NullableStringFieldUpdateOperationsInput | string | null
    phrases?: StringFieldUpdateOperationsInput | string
    sents?: StringFieldUpdateOperationsInput | string
    exam?: StringFieldUpdateOperationsInput | string
    synos?: StringFieldUpdateOperationsInput | string
    relWords?: StringFieldUpdateOperationsInput | string
    mnemonic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptCreateWithoutPaperInput = {
    id?: string
    section: string
    total: number
    correct: number
    detail?: string
    minutes?: number
    createdAt?: Date | string
  }

  export type PaperAttemptUncheckedCreateWithoutPaperInput = {
    id?: string
    section: string
    total: number
    correct: number
    detail?: string
    minutes?: number
    createdAt?: Date | string
  }

  export type PaperAttemptCreateOrConnectWithoutPaperInput = {
    where: PaperAttemptWhereUniqueInput
    create: XOR<PaperAttemptCreateWithoutPaperInput, PaperAttemptUncheckedCreateWithoutPaperInput>
  }

  export type PaperAttemptCreateManyPaperInputEnvelope = {
    data: PaperAttemptCreateManyPaperInput | PaperAttemptCreateManyPaperInput[]
  }

  export type PaperAttemptUpsertWithWhereUniqueWithoutPaperInput = {
    where: PaperAttemptWhereUniqueInput
    update: XOR<PaperAttemptUpdateWithoutPaperInput, PaperAttemptUncheckedUpdateWithoutPaperInput>
    create: XOR<PaperAttemptCreateWithoutPaperInput, PaperAttemptUncheckedCreateWithoutPaperInput>
  }

  export type PaperAttemptUpdateWithWhereUniqueWithoutPaperInput = {
    where: PaperAttemptWhereUniqueInput
    data: XOR<PaperAttemptUpdateWithoutPaperInput, PaperAttemptUncheckedUpdateWithoutPaperInput>
  }

  export type PaperAttemptUpdateManyWithWhereWithoutPaperInput = {
    where: PaperAttemptScalarWhereInput
    data: XOR<PaperAttemptUpdateManyMutationInput, PaperAttemptUncheckedUpdateManyWithoutPaperInput>
  }

  export type PaperAttemptScalarWhereInput = {
    AND?: PaperAttemptScalarWhereInput | PaperAttemptScalarWhereInput[]
    OR?: PaperAttemptScalarWhereInput[]
    NOT?: PaperAttemptScalarWhereInput | PaperAttemptScalarWhereInput[]
    id?: StringFilter<"PaperAttempt"> | string
    paperId?: StringFilter<"PaperAttempt"> | string
    section?: StringFilter<"PaperAttempt"> | string
    total?: IntFilter<"PaperAttempt"> | number
    correct?: IntFilter<"PaperAttempt"> | number
    detail?: StringFilter<"PaperAttempt"> | string
    minutes?: IntFilter<"PaperAttempt"> | number
    createdAt?: DateTimeFilter<"PaperAttempt"> | Date | string
  }

  export type PaperCreateWithoutAttemptsInput = {
    id?: string
    slug: string
    year: number
    month: number
    set: string
    label?: string
    writing?: string | null
    writingModel?: string | null
    writingModelZh?: string | null
    translation?: string | null
    translationReference?: string | null
    subjective?: string
    passages?: string
    questions?: string
    byPart?: string
    questionCount?: number
    audioUrl?: string | null
    audioHls?: string | null
    audioPieces?: string
    listenedAt?: Date | string | null
    source?: string
    createdAt?: Date | string
  }

  export type PaperUncheckedCreateWithoutAttemptsInput = {
    id?: string
    slug: string
    year: number
    month: number
    set: string
    label?: string
    writing?: string | null
    writingModel?: string | null
    writingModelZh?: string | null
    translation?: string | null
    translationReference?: string | null
    subjective?: string
    passages?: string
    questions?: string
    byPart?: string
    questionCount?: number
    audioUrl?: string | null
    audioHls?: string | null
    audioPieces?: string
    listenedAt?: Date | string | null
    source?: string
    createdAt?: Date | string
  }

  export type PaperCreateOrConnectWithoutAttemptsInput = {
    where: PaperWhereUniqueInput
    create: XOR<PaperCreateWithoutAttemptsInput, PaperUncheckedCreateWithoutAttemptsInput>
  }

  export type PaperUpsertWithoutAttemptsInput = {
    update: XOR<PaperUpdateWithoutAttemptsInput, PaperUncheckedUpdateWithoutAttemptsInput>
    create: XOR<PaperCreateWithoutAttemptsInput, PaperUncheckedCreateWithoutAttemptsInput>
    where?: PaperWhereInput
  }

  export type PaperUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: PaperWhereInput
    data: XOR<PaperUpdateWithoutAttemptsInput, PaperUncheckedUpdateWithoutAttemptsInput>
  }

  export type PaperUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    set?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    writing?: NullableStringFieldUpdateOperationsInput | string | null
    writingModel?: NullableStringFieldUpdateOperationsInput | string | null
    writingModelZh?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    translationReference?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: StringFieldUpdateOperationsInput | string
    passages?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    byPart?: StringFieldUpdateOperationsInput | string
    questionCount?: IntFieldUpdateOperationsInput | number
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioHls?: NullableStringFieldUpdateOperationsInput | string | null
    audioPieces?: StringFieldUpdateOperationsInput | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    set?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    writing?: NullableStringFieldUpdateOperationsInput | string | null
    writingModel?: NullableStringFieldUpdateOperationsInput | string | null
    writingModelZh?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    translationReference?: NullableStringFieldUpdateOperationsInput | string | null
    subjective?: StringFieldUpdateOperationsInput | string
    passages?: StringFieldUpdateOperationsInput | string
    questions?: StringFieldUpdateOperationsInput | string
    byPart?: StringFieldUpdateOperationsInput | string
    questionCount?: IntFieldUpdateOperationsInput | number
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioHls?: NullableStringFieldUpdateOperationsInput | string | null
    audioPieces?: StringFieldUpdateOperationsInput | string
    listenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptCreateManyPaperInput = {
    id?: string
    section: string
    total: number
    correct: number
    detail?: string
    minutes?: number
    createdAt?: Date | string
  }

  export type PaperAttemptUpdateWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptUncheckedUpdateWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaperAttemptUncheckedUpdateManyWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    correct?: IntFieldUpdateOperationsInput | number
    detail?: StringFieldUpdateOperationsInput | string
    minutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PaperCountOutputTypeDefaultArgs instead
     */
    export type PaperCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaperCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WordDefaultArgs instead
     */
    export type WordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WordProgressDefaultArgs instead
     */
    export type WordProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WordProgressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotebookItemDefaultArgs instead
     */
    export type NotebookItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotebookItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudySessionDefaultArgs instead
     */
    export type StudySessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudySessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyStatDefaultArgs instead
     */
    export type DailyStatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyStatDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListeningDrillDefaultArgs instead
     */
    export type ListeningDrillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListeningDrillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WritingTemplateDefaultArgs instead
     */
    export type WritingTemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WritingTemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaperDefaultArgs instead
     */
    export type PaperArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaperDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaperAttemptDefaultArgs instead
     */
    export type PaperAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaperAttemptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyArticleDefaultArgs instead
     */
    export type DailyArticleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyArticleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListeningItemDefaultArgs instead
     */
    export type ListeningItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListeningItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingDefaultArgs instead
     */
    export type SettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}