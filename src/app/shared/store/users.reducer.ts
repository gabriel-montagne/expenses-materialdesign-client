import { UsersActions } from '../../layout/users/shared/users.actions';
import { IUser, User } from '../../layout/users/shared/user';

export interface IUsersStore {
    users: User[];
}

export const INITIAL_STATE: IUsersStore = {
    users: []
};

export function usersReducer(state: IUsersStore = INITIAL_STATE,
                             action: any): IUsersStore {
    switch (action.type) {
        case UsersActions.SAVE_USERS:
            return { ...state, users: action.payload};
        case UsersActions.SAVE_USER:
            const users = state.users;
            const idx = users.findIndex((elem) => {
                return elem.id === action.payload.users.id;
            });
            if (idx > -1) {
                const item = users[idx];
                users.splice(idx, 1, action.payload.users);
            }
            return { ...state, users: users};
        default:
            return state;
    }
}
