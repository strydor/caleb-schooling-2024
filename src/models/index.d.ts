import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerHighScore = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HighScore, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly score: number;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHighScore = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HighScore, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly score: number;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HighScore = LazyLoading extends LazyLoadingDisabled ? EagerHighScore : LazyHighScore

export declare const HighScore: (new (init: ModelInit<HighScore>) => HighScore) & {
  copyOf(source: HighScore, mutator: (draft: MutableModel<HighScore>) => MutableModel<HighScore> | void): HighScore;
}

type EagerSynonymPair = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SynonymPair, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly word1: string;
  readonly word2: string;
  readonly difficulty: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySynonymPair = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SynonymPair, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly word1: string;
  readonly word2: string;
  readonly difficulty: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SynonymPair = LazyLoading extends LazyLoadingDisabled ? EagerSynonymPair : LazySynonymPair

export declare const SynonymPair: (new (init: ModelInit<SynonymPair>) => SynonymPair) & {
  copyOf(source: SynonymPair, mutator: (draft: MutableModel<SynonymPair>) => MutableModel<SynonymPair> | void): SynonymPair;
}