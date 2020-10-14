import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Orphnage from './Orphnage'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphnage, orphnage => orphnage.images)
    @JoinColumn({ name: 'orphnage_id' })
    orphnage: Orphnage;
}