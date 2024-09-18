import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { Request } from 'express';

@Controller('/teams')
@UseGuards(JwtAuthGaurd)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post('/create')
  createTeam(@Body() createTeamDto: CreateTeamDto, @Req() request: Request) {
    const userDetails = request['tokenUser'];
    return this.teamsService.createTeam(createTeamDto, userDetails);
  }

  @Get('/allteams')
  getTeams() {
    return this.teamsService.getAllTeams();
  }
}
