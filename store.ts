import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LifeLog } from './types';

interface LifeLogStore {
    logs: LifeLog[];
    addLog: (log: LifeLog) => void;
    removeLog: (id: string) => void;
    toggleLogStatus: (id: string) => void;
}

export const useLifeLogStore = create<LifeLogStore>()(
    persist(
        (set) => ({
            logs: [],
            addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
            removeLog: (id) =>
                set((state) => ({ logs: state.logs.filter((l) => l.id !== id) })),
            toggleLogStatus: (id) =>
                set((state) => ({
                    logs: state.logs.map((log) => {
                        if (log.id === id) {
                            const nextStatus: LifeLog['status'] =
                                log.status === 'completed' ? 'in_progress' : 'completed';
                            return { ...log, status: nextStatus };
                        }
                        return log;
                    })
                })),
        }),
        {
            name: 'lifelog-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
