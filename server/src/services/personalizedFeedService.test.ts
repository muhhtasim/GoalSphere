import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { followService } from './followService'
import { PersonalizedFeedService } from './personalizedFeedService'

const service = new PersonalizedFeedService(followService)

describe('PersonalizedFeedService', () => {
  it('prioritizes live followed-team matches before unrelated content', () => {
    followService.follow('user-1', 'team', 'team-real-madrid')

    const feed = service.buildFeed({
      userId: 'user-1',
      liveMatches: [
        { id: 'live-1', homeTeamId: 'team-real-madrid', awayTeamId: 'team-barcelona', leagueId: 'league-champions', venue: 'Bernabeu', kickoffAt: '2026-09-01T20:00:00.000Z', status: 'live', score: { home: 2, away: 0 }, minute: 75 },
        { id: 'live-2', homeTeamId: 'team-liverpool', awayTeamId: 'team-arsenal', leagueId: 'league-premier', venue: 'Anfield', kickoffAt: '2026-09-01T20:00:00.000Z', status: 'live', score: { home: 1, away: 1 }, minute: 42 },
      ],
      upcomingMatches: [],
      news: [{ id: 'n-1', title: 'Unrelated news', summary: 'Some general content', content: 'General content', source: 'Desk', publishedAt: '2026-09-01T19:00:00.000Z' }],
      popularMatches: [{ id: 'pop-1', homeTeamId: 'team-liverpool', awayTeamId: 'team-arsenal', leagueId: 'league-premier', venue: 'Anfield', kickoffAt: '2026-09-01T20:00:00.000Z', status: 'scheduled' }],
      followableMatches: [],
    })

    assert.equal(feed[0].kind, 'live-match')
    assert.equal(feed[0].match?.id, 'live-1')
    assert.ok(feed[0].score >= feed[1].score)
  })

  it('keeps followed upcoming team fixtures above unrelated popular matches', () => {
    followService.follow('user-2', 'team', 'team-liverpool')

    const feed = service.buildFeed({
      userId: 'user-2',
      liveMatches: [],
      upcomingMatches: [
        { id: 'fixture-1', homeTeamId: 'team-liverpool', awayTeamId: 'team-arsenal', leagueId: 'league-premier', venue: 'Anfield', kickoffAt: '2026-09-05T17:30:00.000Z', status: 'scheduled' },
        { id: 'fixture-2', homeTeamId: 'team-real-madrid', awayTeamId: 'team-barcelona', leagueId: 'league-la-liga', venue: 'Bernabeu', kickoffAt: '2026-09-05T18:00:00.000Z', status: 'scheduled' },
      ],
      news: [],
      popularMatches: [
        { id: 'pop-9', homeTeamId: 'team-real-madrid', awayTeamId: 'team-barcelona', leagueId: 'league-la-liga', venue: 'Bernabeu', kickoffAt: '2026-09-05T18:00:00.000Z', status: 'scheduled' },
      ],
      followableMatches: [],
    })

    assert.equal(feed[0].kind, 'upcoming-match')
    assert.equal(feed[0].match?.id, 'fixture-1')
    assert.ok(feed[0].score > 25)
  })

  it('places followed leagues ahead of unrelated content when the user is not following a team', () => {
    followService.follow('user-3', 'league', 'league-premier')

    const feed = service.buildFeed({
      userId: 'user-3',
      liveMatches: [],
      upcomingMatches: [
        { id: 'fixture-3', homeTeamId: 'team-liverpool', awayTeamId: 'team-arsenal', leagueId: 'league-premier', venue: 'Anfield', kickoffAt: '2026-09-05T17:30:00.000Z', status: 'scheduled' },
      ],
      news: [],
      popularMatches: [
        { id: 'pop-10', homeTeamId: 'team-real-madrid', awayTeamId: 'team-barcelona', leagueId: 'league-la-liga', venue: 'Bernabeu', kickoffAt: '2026-09-05T18:00:00.000Z', status: 'scheduled' },
      ],
      followableMatches: [],
    })

    assert.equal(feed[0].kind, 'league-match')
    assert.equal(feed[0].match?.id, 'fixture-3')
    assert.ok(feed[0].score > feed[feed.length - 1].score)
  })
})
