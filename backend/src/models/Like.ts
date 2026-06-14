import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

import User from "./User";
import Vacation from "./Vacation";

@Table({
    underscored: true,
    timestamps: false,
})
export default class Like extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: string;

    @PrimaryKey
    @ForeignKey(() => Vacation)
    @Column
    vacationId: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Vacation)
    vacation: Vacation;
}