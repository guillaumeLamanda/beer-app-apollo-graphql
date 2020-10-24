import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '@ba/server/src/database/user.model';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/**
 * The `Beer` type reprensent a beer object,
 * agregated from [punk api](https://punkapi.com/documentation/v2)
 */
export type Beer = {
   __typename?: 'Beer';
  id: Scalars['ID'];
  name: Scalars['String'];
  /**
   * Small Description of the beer
   * **small** mean it is a short text
   */
  tagline: Scalars['String'];
  /**
   * Complete description of the beer.
   * If you want a small text, use `tagline`
   */
  description: Scalars['String'];
  abv: Scalars['Float'];
};

/** Beer Input to require beers */
export type BeersInput = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export enum LikeAction {
  Like = 'like',
  Dislike = 'dislike'
}

export type Mutation = {
   __typename?: 'Mutation';
  /**
   * Register mutation
   * @deprecated Field no longer supported
   */
  register: User;
  /**
   * Login mutation.
   * If the user does not exist, the user is created
   */
  login: User;
  /**
   * Add a beer in favorites.
   * The request need to be authenticated to call this mutation.
   */
  toogleBeerLike: User;
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  name: Scalars['String'];
};


export type MutationToogleBeerLikeArgs = {
  beerId: Scalars['ID'];
};

export type Query = {
   __typename?: 'Query';
  /** Request a `Beer` by an ID */
  beer: Beer;
  /**
   * Request a beers collection.
   * You need to specify the page and the pageSize of `BeersInput`
   */
  beers: Array<Beer>;
  /** Request users */
  users: Array<User>;
  /** Request a user by id */
  user?: Maybe<User>;
  /**
   * Request the current authentified user.
   * Return `null` if the user is not authentified
   */
  me?: Maybe<User>;
};


export type QueryBeerArgs = {
  id: Scalars['ID'];
};


export type QueryBeersArgs = {
  input: BeersInput;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
   __typename?: 'Subscription';
  /**
   * Suscribe to users connections to the app.
   * Deprecated because the service is deployed on serverless,
   * and it does not handle WebSockets.
   * @deprecated Field no longer supported
   */
  userLoggedIn: User;
  /**
   * Suscribe to `like` events.
   * Deprecated because the service is deployed on serverless,
   * and it does not handle WebSockets.
   * @deprecated Field no longer supported
   */
  userLikedABeer: UserLike;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  beers: Array<Beer>;
};

export type UserLike = {
   __typename?: 'UserLike';
  user: User;
  beer: Beer;
  action: LikeAction;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Beer: ResolverTypeWrapper<Beer>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  BeersInput: BeersInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  User: ResolverTypeWrapper<UserModel>,
  Mutation: ResolverTypeWrapper<{}>,
  Subscription: ResolverTypeWrapper<{}>,
  UserLike: ResolverTypeWrapper<Omit<UserLike, 'user'> & { user: ResolversTypes['User'] }>,
  LikeAction: LikeAction,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Beer: Beer,
  String: Scalars['String'],
  Float: Scalars['Float'],
  BeersInput: BeersInput,
  Int: Scalars['Int'],
  User: UserModel,
  Mutation: {},
  Subscription: {},
  UserLike: Omit<UserLike, 'user'> & { user: ResolversParentTypes['User'] },
  LikeAction: LikeAction,
  Boolean: Scalars['Boolean'],
};

export type BeerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Beer'] = ResolversParentTypes['Beer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tagline?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  abv?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'name'>>,
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'name'>>,
  toogleBeerLike?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationToogleBeerLikeArgs, 'beerId'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  beer?: Resolver<ResolversTypes['Beer'], ParentType, ContextType, RequireFields<QueryBeerArgs, 'id'>>,
  beers?: Resolver<Array<ResolversTypes['Beer']>, ParentType, ContextType, RequireFields<QueryBeersArgs, 'input'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userLoggedIn?: SubscriptionResolver<ResolversTypes['User'], "userLoggedIn", ParentType, ContextType>,
  userLikedABeer?: SubscriptionResolver<ResolversTypes['UserLike'], "userLikedABeer", ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  beers?: Resolver<Array<ResolversTypes['Beer']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserLikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLike'] = ResolversParentTypes['UserLike']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  beer?: Resolver<ResolversTypes['Beer'], ParentType, ContextType>,
  action?: Resolver<ResolversTypes['LikeAction'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Beer?: BeerResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  UserLike?: UserLikeResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
