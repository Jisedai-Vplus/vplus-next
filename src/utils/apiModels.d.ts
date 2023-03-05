// post Login
export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginApiReturn {
  code: number;
  login: bool;
  msg: string;
  data?: object;
}

// post Register
export interface RegisterValues {
  password: string;
  email: string;
  pin: string;
}

export interface PinValues {
  email: string;
}

export interface RegisterApiReturn {
  code: number;
  register: bool;
  msg: string;
}

export interface PinApiReturn {
  code: number;
  msg: string;
}

// post ChangePassword
export interface ChangePasswordApiReturn {
  code: number;
  msg: string;
}

// post Logout
export interface LogoutApiReturn {
  code: number;
}

// get User
export interface UserModel {
  username: string;
  uid: number;
  email: string;
}

export interface UserApiReturn {
  code: number;
  data: {
    username: string;
    uid: number;
    email: string;
  };
}

// get SearchSubscribe
export interface SearchQueryModel {
  search_name: string;
}
export interface SearchSubscribeApiReturn {
  code: number;
  data: Array<{
    mid: number;
    uname: string;
    fans: number;
    usign: string;
    upic: string;
    raw: object;
  }>;
}

// post DoSubscribe
export interface DoSubscribeValues {
  mid: number;
  gid: Array<number>;
}

export interface DoSubscribeApiReturn {
  code: number;
  msg: string;
}

// get GroupList
export interface GroupListApiReturn {
  code: number;
  data: Array<{
    gid: number;
    group_name: string;
    count: number;
  }>;
}

// get GroupListMid
export interface GroupListMidQueryModel {
  mid: number;
}

export interface GroupListMidApiReturn {
  code: number;
  data: Array<{
    gid: number;
    group_name: string;
    count: number;
    in_this_group: boolean;
  }>;
}

// get GroupMember
export interface GroupMemberQueryModel {
  gid: number;
  page: number;
  size?: number;
}

export interface GroupMemberApiReturn {
  code: number;
  data: {
    has_more: boolean;
    gid: number;
    group_name: string;
    count: number;
    page: number;
    pages: number;
    data: Array<{
      mid: number;
      name: string;
      face: string;
    }>;
  };
}

// post AddGroup
export interface AddGroupApiReturn {
  code: number;
  success: boolean;
  data: {
    gid: number;
    group_name: string;
  };
}

// post RenameGroup
export interface RenameGroupApiReturn {
  code: number;
  data: {
    gid: number;
    group_name: string;
  };
}

// post DelGroup
export interface DelGroupApiReturn {
  code: number;
  msg: string;
}

// post MoveMember
export interface MoveMemberApiReturn {
  code: number;
  msg: string;
}

// get Dynamic
export interface DynamicQueryModel {
  gid: number;
  offset: number;
  size: number;
}

export interface DynamicApiReturn {
  code: number;
  data: {
    has_more: boolean;
    gid: number;
    group_name: string;
    offset: number;
    data: Array<{
      dynamic_id: number;
      mid: number;
      dynamic_type: number;
      timestamp: number;
      raw: any;
    }>;
  };
}

// get Timeline
export interface TimelineQueryModel {
  gid: number;
  offset: number;
  size: number;
}

export interface TimelineApiReturn {
  code: number;
  data: {
    has_more: boolean;
    gid: number;
    group_name: string;
    offset: number;
    data: Array<any>;
  };
}

// get View All Games
export interface GameItem {
  id: number;
  created: string;
  ext: string;
  creatorid: number;
  status: string;
  title: string;
}

export interface ViewAllGamesQuery {
  mode?: string;
}

export interface ViewAllGamesApiReturn extends Array<GameItem> {}

// get View Posts of Game
export interface PostItem {
  id: number;
  gameid: number;
  created: string;
  title: string;
  body: string;
  diva: string;
  producer: string;
  playerid: number;
  playername: string;
  url: string;
}

export interface ViewGamePostsQuery {
  gameid: number;
  mode?: string;
}

export interface ViewGamePostsApiReturn {
  gameid: number;
  title: string;
  posts: Array<PostItem>;
}

// post Check Assumptions for One Game
export interface GuessPostPlayerItem {
  id: number;
  playernames: Array<string>;
}

export interface GuessPostPlayerResultItem {
  id: number;
  result: string;
}

export interface GuessOneGamePlayersApiReturn {
  gameid: number;
  results: Array<GuessPostPlayerResultItem>;
}

// post Contribute
export interface ContributeOnePostApiReturn {
  add: boolean;
}
