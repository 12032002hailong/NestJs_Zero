import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscriber,
  SubscriberDocument,
} from 'src/subscribers/schema/subscriber.schema';
import { Model } from 'mongoose';
import { Job, JobDocument } from 'src/jobs/schema/job.schema';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
    @InjectModel(Subscriber.name)
    private subscriberModel: Model<SubscriberDocument>,
    @InjectModel(Job.name)
    private jobModel: Model<JobDocument>,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestEmail() {
    const jobs = [
      {
        name: 'Senior Backend Developer (Node.js)',
        company: 'TechCorp Solutions',
        salary: 5000,
        skills: ['Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
      },
      {
        name: 'Product Manager',
        company: 'Innovate Hub',
        salary: 4500,
        skills: ['Agile', 'Scrum', 'Roadmap Planning', 'UX/UI'],
      },
      {
        name: 'Frontend Developer (React)',
        company: 'VinaWeb Creators',
        salary: 3000,
        skills: ['React', 'Redux', 'HTML5', 'CSS3', 'JavaScript'],
      },
      {
        name: 'Data Analyst',
        company: 'Data Insights Ltd.',
        salary: 3500,
        skills: ['SQL', 'Python', 'Tableau', 'Power BI'],
      },
    ];

    const subscribers = await this.subscriberModel.find({});
    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });
      if (jobWithMatchingSkills.length > 0) {
        const jobs = jobWithMatchingSkills.map((job) => {
          return {
            name: job.name,
            company: job.company.name,
            salary:
              `${job.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
            skills: job.skills,
          };
        });

        await this.mailerService.sendMail({
          to: 'hailongkc1203@gmail.com',
          from: '"Support Team <suppoer@example.com>',
          subject: 'Testing Nest MailerModule ✔',
          template: 'new-job',
          context: {
            receiver: subs.name,
            jobs: jobs,
          },
        });
      }
    }
  }
}
