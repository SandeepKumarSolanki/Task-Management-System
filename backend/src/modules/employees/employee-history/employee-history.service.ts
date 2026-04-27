import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeHistory } from './employee-history.model';
import { Op } from 'sequelize';

@Injectable()
export class EmployeeHistoryService {
  constructor(
    @InjectModel(EmployeeHistory)
    private historyModel: typeof EmployeeHistory,
  ) {}

  async createHistory(data: {
    user_id: number;
    role_id: number | null;
    department_id: number | null;
    designation_id: number | null;
    reason: string;
  }) {
    return this.historyModel.create({
      user_id: data.user_id,
      role_id: data.role_id,
      department_id: data.department_id ?? null,
      designation_id: data.designation_id ?? null,
      start_date: new Date(),
      end_date: null,
      reason: data.reason,
    } as any);
  }

  async closePreviousHistory(user_id: number) {
    const activeHistory = await this.historyModel.findOne({
      where: {
        user_id,
        end_date: {
          [Op.is]: null,
        },
      },
      order: [['created_at', 'DESC']],
    });

    if (activeHistory) {
      await activeHistory.update({
        end_date: new Date(),
      });
    }
  }
}
