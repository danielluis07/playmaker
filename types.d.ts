type Teams = {
  sports: Array<{
    id: string;
    uid: string;
    name: string;
    slug: string;
    leagues: Array<{
      id: string;
      uid: string;
      name: string;
      abbreviation: string;
      shortName: string;
      slug: string;
      teams: Array<{
        team: {
          id: string;
          uid: string;
          slug: string;
          abbreviation: string;
          displayName: string;
          shortDisplayName: string;
          name: string;
          nickname: string;
          location: string;
          color: string;
          alternateColor: string;
          isActive: boolean;
          isAllStar: boolean;
          logos: Array<{
            href: string;
            alt: string;
            rel: string[];
            width: number;
            height: number;
          }>;
          links: Array<{
            language: string;
            rel: string[];
            href: string;
            text: string;
            shortText: string;
            isExternal: boolean;
            isPremium: boolean;
            isHidden: boolean;
          }>;
        };
      }>;
      year: number;
      season: {
        year: number;
        displayName: string;
      };
    }>;
  }>;
};

type Team = {
  team: {
    id: string;
    uid: string;
    slug: string;
    location: string;
    name: string;
    nickname: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    color: string;
    alternateColor: string;
    isActive: boolean;
    logos: Array<{
      href: string;
      width: number;
      height: number;
      alt: string;
      rel: string[];
      lastUpdated: string;
    }>;
    record: {
      items: Array<{
        description: string;
        type: string;
        summary: string;
        stats: Array<{
          name: string;
          value: string;
        }>;
      }>;
    };
    groups: {
      id: string;
      parent: {
        id: string;
      };
      isConference: boolean;
    };
    links: Array<{
      language: string;
      rel: string[];
      href: string;
      text: string;
      shortText: string;
      isExternal: boolean;
      isPremium: boolean;
    }>;
    franchise: {
      $ref: string;
      id: string;
      uid: string;
      slug: string;
      location: string;
      name: string;
      nickname: string;
      abbreviation: string;
      displayName: string;
      shortDisplayName: string;
      color: string;
      isActive: boolean;
      venue: {
        $ref: string;
        id: string;
        fullName: string;
        shortName?: string;
        address?: {
          city: string;
          state: string;
          zipCode?: string;
        };
        grass: boolean;
        indoor: boolean;
        images: Array<{
          href: string;
          width: number;
          height: number;
          alt: string;
          rel: string[];
        }>;
      };
      team: { $ref: string };
    };
    nextEvent: [];
    standingSummary: string;
  };
};

type Roster = {
  timestamp: string;
  status: string;
  season: {
    year: string;
    displayName: string;
    type: number;
    name: string;
  };
  athletes: Array<{
    position: string;
    items: Array<{
      id: string;
      uid: string;
      guid: string;
      alternateIds: {
        sdr: string;
      };
      firstName: string;
      lastName: string;
      fullName: string;
      displayName: string;
      shortName: string;
      weight: number;
      displayWeight: string;
      height: number;
      displayHeight: string;
      age: number;
      dateOfBirth: string;
      links: Array<{
        language: string;
        rel: string[];
        href: string;
        text: string;
        shortText: string;
        isExternal: boolean;
        isPremium: boolean;
      }>;
      birthPlace: {
        city: string;
        state: string;
        country: string;
      };
      college: {
        id: string;
        mascot: string;
        name: string;
        shortName: string;
        abbrev: string;
        logos: Array<{
          href: string;
          width: number;
          height: number;
          alt: string;
          rel: string[];
          lastUpdated: string;
        }>;
      };
      slug: string;
      jersey: string;
      position: {
        id: string;
        name: string;
        displayName: string;
        abbreviation: string;
        leaf: boolean;
        parent: {
          id: string;
          name: string;
          displayName: string;
          abbreviation: string;
          leaf: boolean;
        };
      };
      injuries: Array<{
        status: string;
        date: string;
      }>;
      contracts: any[];
      experience: {
        years: number;
      };
      status: {
        id: string;
        name: string;
        type: string;
        abbreviation: string;
      };
      headshot: {
        href: string;
        alt: string;
      };
    }>;
  }>;
  coach: Array<{
    id: string;
    firstName: string;
    lastName: string;
    experience: number;
  }>;
  team: {
    id: string;
    abbreviation: string;
    location: string;
    name: string;
    displayName: string;
    clubhouse: string;
    color: string;
    logo: string;
    recordSummary: string;
    seasonSummary: string;
    standingSummary: string;
  };
};

type Schedule = {
  leagues: Array<{
    id: string;
    uid: string;
    name: string;
    abbreviation: string;
    slug: string;
    season: {
      year: number;
      startDate: string;
      endDate: string;
      displayName: string;
      type: {
        id: string;
        type: number;
        name: string;
        abbreviation: string;
      };
    };
    logos: Array<{
      href: string;
      width: number;
      height: number;
      alt: string;
      rel: string[];
      lastUpdated: string;
    }>;
    calendarType: string;
    calendarIsWhitelist: boolean;
    calendarStartDate: string;
    calendarEndDate: string;
    calendar: Array<{
      label: string;
      value: string;
      startDate: string;
      endDate: string;
      entries: Array<{
        label: string;
        alternateLabel: string;
        detail: string;
        value: string;
        startDate: string;
        endDate: string;
      }>;
    }>;
  }>;
  season: {
    type: number;
    year: number;
  };
  week: {
    number: number;
  };
  events: Array<{
    id: string;
    uid: string;
    date: string;
    name: string;
    shortName: string;
    season: {
      year: number;
      type: number;
      slug: string;
    };
    week: {
      number: number;
    };
    competitions: Array<{
      id: string;
      uid: string;
      date: string;
      attendance: number;
      type: {
        id: string;
        abbreviation: string;
      };
      timeValid: boolean;
      neutralSite: boolean;
      conferenceCompetition: boolean;
      playByPlayAvailable: boolean;
      recent: boolean;
      venue: {
        id: string;
        fullName: string;
        address: {
          city: string;
          state: string;
        };
        indoor: boolean;
        images: Array<{
          href: string;
          width: number;
          height: number;
          alt: string;
          rel: string[];
        }>;
      };
      competitors: Array<{
        id: string;
        uid: string;
        type: string;
        order: number;
        homeAway: string;
        team: {
          id: string;
          uid: string;
          location: string;
          name: string;
          abbreviation: string;
          displayName: string;
          shortDisplayName: string;
          color: string;
          alternateColor: string;
          isActive: boolean;
          venue: {
            id: string;
          };
          links: Array<{
            rel: string[];
            href: string;
            text: string;
            isExternal: boolean;
            isPremium: boolean;
          }>;
          logo: string;
        };
        score: string;
        statistics: any[];
      }>;
      notes: any[];
      status: {
        clock: number;
        displayClock: string;
        period: number;
        type: {
          id: string;
          name: string;
          state: string;
          completed: boolean;
          description: string;
          detail: string;
          shortDetail: string;
        };
        isTBDFlex: boolean;
      };
      broadcasts: Array<{
        market: string;
        names: string[];
      }>;
      format: {
        regulation: {
          periods: number;
        };
      };
      tickets: Array<{
        summary: string;
        numberAvailable: number;
        links: {
          href: string;
        }[];
      }>;
      startDate: string;
      geoBroadcasts: Array<{
        market: string;
        names: string[];
      }>;
      odds: Array<{
        provider: {
          id: string;
          name: string;
          priority: number;
        };
        details: string;
        overUnder: number;
        spread: number;
        awayTeamOdds: {
          favorite: boolean;
          underdog: boolean;
          team: Team;
        };
        homeTeamOdds: {
          favorite: boolean;
          underdog: boolean;
          team: Team;
        };
        open: {
          over: {
            value: number;
            displayValue: string;
            alternateDisplayValue: string;
            decimal: number;
            fraction: string;
            american: string;
          };
          under: {
            value: number;
            displayValue: string;
            alternateDisplayValue: string;
            decimal: number;
            fraction: string;
            american: string;
          };
          total: {
            alternateDisplayValue: string;
            american: string;
          };
        };
        current: {
          over: {
            value: number;
            displayValue: string;
            alternateDisplayValue: string;
            decimal: number;
            fraction: string;
            american: string;
          };
          under: {
            value: number;
            displayValue: string;
            alternateDisplayValue: string;
            decimal: number;
            fraction: string;
            american: string;
          };
          total: {
            alternateDisplayValue: string;
            american: string;
          };
        };
      }>;
    }>;
    links: Array<{
      rel: string[];
      href: string;
      text: string;
      isExternal: boolean;
      isPremium: boolean;
    }>;
    status: {
      clock: number;
      displayClock: string;
      period: number;
      type: {
        id: string;
        name: string;
        state: string;
        completed: boolean;
        description: string;
        detail: string;
        shortDetail: string;
      };
      isTBDFlex: boolean;
    };
  }>;
};

type Athlete = {
  $ref: string;
  id: string;
  uid: string;
  guid: string;
  type: string;
  alternateIds: {
    sdr: string;
  };
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  shortName: string;
  weight: number;
  displayWeight: string;
  height: number;
  displayHeight: string;
  age: number;
  dateOfBirth: string;
  links: Array<{
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
  }>;
  birthPlace: {
    city: string;
    state: string;
    country: string;
  };
  college: {
    $ref: string;
  };
  slug: string;
  headshot: {
    href: string;
    alt: string;
  };
  jersey: string;
  position: {
    $ref: string;
    id: string;
    name: string;
    displayName: string;
    abbreviation: string;
    leaf: boolean;
    parent: {
      $ref: string;
    };
  };
  linked: boolean;
  team: {
    $ref: string;
  };
  statistics: {
    $ref: string;
  };
  contracts: {
    $ref: string;
  };
  experience: {
    years: number;
  };
  collegeAthlete: {
    $ref: string;
  };
  active: boolean;
  draft: {
    displayText: string;
    round: number;
    year: number;
    selection: number;
    team: {
      $ref: string;
    };
  };
  status: {
    id: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  statisticslog: {
    $ref: string;
  };
};

type Event = {
  boxscore: {
    teams: Array<{
      team: {
        id: string;
        uid: string;
        slug: string;
        location: string;
        name: string;
        abbreviation: string;
        displayName: string;
        shortDisplayName: string;
        color: string;
        alternateColor: string;
        logo: string;
      };
      statistics: Array<{
        name: string;
        displayValue: string;
        label: string;
      }>;
      displayOrder: number;
      homeAway: string;
    }>;
    players: Array<{
      team: {
        id: string;
        uid: string;
        slug: string;
        location: string;
        name: string;
        abbreviation: string;
        displayName: string;
        shortDisplayName: string;
        color: string;
        alternateColor: string;
        logo: string;
      };
      statistics: Array<{
        name: string;
        keys: string[];
        text: string;
        labels: string[];
        descriptions: string[];
        athletes: Array<{
          athlete: {
            id: string;
            uid: string;
            guid: string;
            firstName: string;
            lastName: string;
            displayName: string;
            links: Array<{
              rel: string[];
              href: string;
              text: string;
            }>;
            jersey: string;
          };
          stats: string[];
        }>;
        totals: string[];
      }>;
      displayOrder: number;
    }>;
  };
  format: {
    regulation: {
      periods: number;
      displayName: string;
      slug: string;
      clock: number;
    };
    overtime: {
      periods: number;
      displayName: string;
      slug: string;
      clock: number;
    };
  };
  gameInfo: {
    venue: {
      id: string;
      fullName: string;
      address: {
        city: string;
        state: string;
        zipCode: string;
      };
      grass: boolean;
      images: Array<{
        href: string;
        width: number;
        height: number;
        alt: string;
        rel: string[];
      }>;
    };
    attendance: number;
    officials: Array<{
      fullName: string;
      displayName: string;
      position: {
        name: string;
        displayName: string;
        id: string;
      };
      order: number;
    }>;
  };
  drives: {
    previous: Array<{
      id: string;
      description: string;
      team: {
        name: string;
        abbreviation: string;
        displayName: string;
        shortDisplayName: string;
        logos: Array<{
          href: string;
          width: number;
          height: number;
          alt: string;
          rel: string[];
          lastUpdated: string;
        }>;
      };
      start: {
        period: {
          type: string;
          number: number;
        };
        clock: {
          displayValue: string;
        };
        yardLine: number;
        text: string;
      };
      end: {
        period: {
          type: string;
          number: number;
        };
        clock: {
          displayValue: string;
        };
        yardLine: number;
        text: string;
      };
      timeElapsed: {
        displayValue: string;
      };
      yards: number;
      isScore: boolean;
      offensivePlays: number;
      result: string;
      shortDisplayResult: string;
      displayResult: string;
      plays: Array<{
        id: string;
        sequenceNumber: string;
        type: {
          id: string;
          text: string;
          abbreviation: string;
        };
        text: string;
        awayScore: number;
        homeScore: number;
        period: {
          number: number;
        };
        clock: {
          displayValue: string;
        };
        scoringPlay: boolean;
        priority: boolean;
        modified: string;
        wallclock: string;
        start: {
          down: number;
          distance: number;
          yardLine: number;
          yardsToEndzone: number;
          team: {
            id: string;
          };
        };
        end: {
          down: number;
          distance: number;
          yardLine: number;
          yardsToEndzone: number;
          downDistanceText: string;
          shortDownDistanceText: string;
          possessionText: string;
          team: {
            id: string;
          };
          statYardage: number;
        };
      }>;
    }>;
  };
  leaders: Array<{
    team: {
      id: string;
      uid: string;
      displayName: string;
      abbreviation: string;
      links: Array<{
        href: string;
        text: string;
      }>;
      logo: string;
      logos: Array<{
        href: string;
        width: number;
        height: number;
        alt: string;
        rel: string[];
        lastUpdated: string;
      }>;
    };
    leaders: Array<{
      name: string;
      displayName: string;
      leaders: Array<{
        displayValue: string;
        athlete: {
          id: string;
          uid: string;
          guid: string;
          lastName: string;
          fullName: string;
          displayName: string;
          shortName: string;
          links: Array<{
            rel: string[];
            href: string;
            text: string;
          }>;
          headshot: {
            href: string;
            alt: string;
          };
          jersey: string;
          position: {
            abbreviation: string;
          };
          team: {
            href: string;
          };
          status: {
            id: string;
            name: string;
            type: string;
            abbreviation: string;
          };
        };
      }>;
    }>;
  }>;
  broadcasts: [];
  predictor: {
    header: string;
    homeTeam: {
      id: string;
      gameProjection: string;
      teamChanceLoss: string;
      teamChanceTie: string;
    };
    awayTeam: {
      id: string;
      gameProjection: string;
      teamChanceLoss: string;
      teamChanceTie: string;
    };
  };
  pickcenter: Array<{
    provider: {
      id: string;
      name: string;
      priority: number;
    };
    details: string;
    overUnder: number;
    spread: number;
    overOdds: number;
    underOdds: number;
    awayTeamOdds: {
      winPercentage: number;
      favorite: boolean;
      underdog: boolean;
      moneyLine: number;
      spreadOdds: number;
      current: {
        pointSpread: {
          alternateDisplayValue: string;
          american: string;
        };
        spread: {
          alternateDisplayValue: string;
          american: string;
        };
        moneyLine: {
          alternateDisplayValue: string;
          american: string;
        };
      };
      teamId: string;
    };
    homeTeamOdds: {
      winPercentage: number;
      favorite: boolean;
      underdog: boolean;
      moneyLine: number;
      spreadOdds: number;
      current: {
        pointSpread: {
          alternateDisplayValue: string;
          american: string;
        };
        spread: {
          alternateDisplayValue: string;
          american: string;
        };
        moneyLine: {
          alternateDisplayValue: string;
          american: string;
        };
      };
      teamId: string;
    };
    links: [];
    current: {
      over: {
        alternateDisplayValue: string;
        american: string;
      };
      under: {
        alternateDisplayValue: string;
        american: string;
      };
      total: {
        alternateDisplayValue: string;
        american: string;
      };
    };
  }>;
  againstTheSpread: Array<{
    team: {
      id: string;
      uid: string;
      displayName: string;
      abbreviation: string;
      links: Array<{
        href: string;
        text: string;
      }>;
      logo: string;
      logos: Array<{
        href: string;
        width: number;
        height: number;
        alt: string;
        rel: string[];
        lastUpdated: string;
      }>;
    };
    records: [];
  }>;
  odds: [];
  winprobability: Array<{
    tiePercentage: number;
    homeWinPercentage: number;
    secondsLeft: number;
    playId: string;
  }>;
  header: {
    id: string;
    uid: string;
    season: {
      year: number;
      type: number;
    };
    timeValid: boolean;
    competitions: Array<{
      id: string;
      uid: string;
      date: string;
      neutralSite: boolean;
      conferenceCompetition: boolean;
      boxscoreAvailable: boolean;
      commentaryAvailable: boolean;
      liveAvailable: boolean;
      onWatchESPN: boolean;
      recent: boolean;
      boxscoreSource: string;
      playByPlaySource: string;
    }>;
    links: Array<{
      rel: string[];
      href: string;
      text: string;
      shortText: string;
      isExternal: boolean;
      isPremium: boolean;
    }>;
    week: number;
    league: {
      id: string;
      uid: string;
      name: string;
      abbreviation: string;
      slug: string;
      isTournament: boolean;
      links: Array<{
        rel: string[];
        href: string;
        text: string;
      }>;
    };
  };
  scoringPlays: Array<{
    id: string;
    type: {
      id: string;
      text: string;
      abbreviation: string;
    };
    text: string;
    awayScore: number;
    homeScore: number;
    period: {
      number: number;
    };
    clock: {
      value: number;
      displayValue: string;
    };
    team: {
      id: string;
      uid: string;
      displayName: string;
      abbreviation: string;
      links: Array<{
        href: string;
        text: string;
      }>;
      logo: string;
      logos: Array<{
        href: string;
        width: number;
        height: number;
        alt: string;
        rel: string[];
        lastUpdated: string;
      }>;
    };
    scoringType: {
      name: string;
      displayName: string;
      abbreviation: string;
    };
  }>;
  videos: [];
  // news
  // article
  // standings
};

type Standings = {
  $ref: string;
  id: number;
  name: string;
  displayName: string;
  standings: Array<{
    team: {
      $ref: string;
    };
    records: Array<{
      $ref: string;
      id: string;
      name: string;
      abbreviation: string;
      type: string;
      summary: string;
      displayValue: string;
      value: number;
      stats: Array<{
        name: string;
        displayName: string;
        shortDisplayName: string;
        description: string;
        abbreviation: string;
        type: string;
        value: number;
        displayValue: string;
      }>;
    }>;
  }>;
  links: Array<{
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
  }>;
};

type NbaStandings = {
  $ref: string;
  id: number;
  name: string;
  displayName: string;
  standings: Array<{
    team: {
      $ref: string;
    };
    records: Array<{
      $ref: string;
      id: string;
      name: string;
      abbreviation: string;
      displayName: string;
      shortDisplayName: string;
      description: string;
      type: string;
      summary: string;
      displayValue: string;
      value: number;
      stats: Array<{
        name: string;
        displayName: string;
        shortDisplayName: string;
        description: string;
        abbreviation: string;
        type: string;
        value: number;
        displayValue: string;
      }>;
    }>;
  }>;
  links: Array<{
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
  }>;
};

type NbaSchedule = {
  leagues: Array<{
    id: string;
    uid: string;
    name: string;
    abbreviation: string;
    slug: string;
    season: {
      year: number;
      startDate: string;
      endDate: string;
      displayName: string;
      type: {
        id: string;
        type: number;
        abbreviation: string;
      };
    };
    logos: Arry<{
      href: string;
      width: number;
      height: number;
      alt: string;
      rel: string[];
      lastUpdated: string;
    }>;
    calendarType: string;
    calendarIsWhitelist: boolean;
    calendarStartDate: string;
    calendarEndDate: string;
    calendar: string[];
  }>;
  events: Array<{
    id: string;
    uid: string;
    date: string;
    name: string;
    shortName: string;
    season: {
      year: number;
      type: number;
      slug: string;
    };
    competitions: Array<{
      id: string;
      uid: string;
      date: string;
      attendance: number;
      type: {
        id: string;
        abbreviation: string;
      };
      timeValid: boolean;
      neutralSite: boolean;
      conferenceCompetition: boolean;
      playByPlayAvailable: boolean;
      recent: boolean;
      venue: {
        id: string;
        fullName: string;
        address: {
          city: string;
          state: string;
        };
        indoor: boolean;
      };
      competitors: Array<{
        id: string;
        uid: string;
        type: string;
        order: number;
        homeAway: string;
        winner: string;
        team: {
          id: number;
          uid: string;
          location: string;
          name: string;
          abbreviation: string;
          displayName: string;
          shortDisplayName: string;
          color: string;
          alternateColor: string;
          isActive: number;
          venue: {
            id: string;
          };
          links: Array<{
            rel: string[];
            href: string;
            text: string;
            isExternal: boolean;
            isPremium: boolean;
          }>;
          logo: string;
        };
        score: string;
        linescores: Array<{
          value: number;
        }>;
        statistics: Array<{
          name: string;
          abbreviation: string;
          displayValue: string;
        }>;
        leaders: Array<{
          name: string;
          displayName: string;
          shortDisplayName: string;
          abbreviation: string;
          leaders: Array<{
            displayValue: string;
            value: number;
            athlete: {
              id: string;
              fullName: string;
              displayName: string;
              shortName: string;
              links: Array<{
                rel: string[];
                href: string;
              }>;
              headshot: string;
              jersey: string;
              position: {
                abbreviation: string;
              };
              team: {
                id: string;
              };
              active: boolean;
            };
            team: {
              id: string;
            };
          }>;
        }>;
        records: Array<{
          name: string;
          abbreviation: string;
          type: string;
          summary: string;
        }>;
      }>;
      notes: [];
      status: {
        clock: number;
        displayClock: string;
        period: number;
        type: {
          id: string;
          name: string;
          state: string;
          completed: boolean;
          description: string;
          detail: string;
          shortDetail: string;
        };
      };
      broadcasts: [];
      format: {
        regulation: {
          periods: number;
        };
      };
      startDate: string;
      geoBroadcasts: [];
      headlines: Array<{
        type: string;
        description: string;
        shortLinkText: string;
        video: Array<{
          id: number;
          source: string;
          headline: string;
          thumbnail: string;
          duration: number;
          tracking: {
            sportName: string;
            leagueName: string;
            coverageType: string;
            trackingName: string;
            trackingId: string;
          };
          deviceRestrictions: {
            type: string;
            devices: string[];
          };
          geoRestrictions: {
            type: string;
            countries: string[];
          };
          links: {
            api: {
              self: {
                href: string;
              };
              artwork: {
                href: string;
              };
            };
            web: {
              href: string;
              short: {
                href: string;
              };
              self: {
                href: string;
              };
            };
            source: {
              mezzanine: {
                href: string;
              };
              flash: {
                href: string;
              };
              hds: {
                href: string;
              };
              HLS: {
                href: string;
                HD: {
                  href: string;
                };
              };
              HD: {
                href: string;
              };
              full: {
                href: string;
              };
              href: string;
            };
            mobile: {
              alert: {
                href: string;
              };
              source: {
                href: string;
              };
              href: string;
              streaming: {
                href: string;
              };
              progressiveDownload: {
                href: string;
              };
            };
          };
        }>;
      }>;
    }>;
    links: Array<{
      language: string;
      rel: string[];
      href: string;
      text: string;
      shortText: string;
      isExternal: boolean;
      isPremium: boolean;
    }>;
    status: {
      clock: number;
      displayClock: string;
      period: number;
      type: {
        id: string;
        name: string;
        state: string;
        completed: boolean;
        description: string;
        detail: string;
        shortDetail: string;
      };
    };
  }>;
};

type NbaRoster = {
  timestamp: string;
  status: string;
  season: {
    year: string;
    displayName: string;
    type: number;
    name: string;
  };
  athletes: Array<{
    id: string;
    uid: string;
    guid: string;
    alternateIds: {
      sdr: string;
    };
    firstName: string;
    lastName: string;
    fullName: string;
    displayName: string;
    shortName: string;
    weight: number;
    displayWeight: string;
    height: number;
    displayHeight: string;
    age: number;
    dateOfBirth: string;
    links: Array<{
      language: string;
      rel: string[];
      href: string;
      text: string;
      shortText: string;
      isExternal: boolean;
      isPremium: boolean;
    }>;
    birthPlace: {
      city: string;
      state: string;
      country: string;
    };
    college: {
      id: string;
      mascot: string;
      name: string;
      shortName: string;
      abbrev: string;
      logos: Array<{
        href: string;
        width: number;
        height: number;
        alt: string;
        rel: string[];
        lastUpdated: string;
      }>;
    };
    slug: string;
    headshot: {
      href: string;
      alt: string;
    };
    jersey: string;
    position: {
      id: string;
      name: string;
      displayName: string;
      abbreviation: string;
      leaf: boolean;
    };
    injuries: Array<{
      status: string;
      date: string;
    }>;
    teams: Array<{
      $ref: string;
    }>;
    contracts: Array<{
      salary: number;
      season: Array<{
        year: number;
        startDate: string;
        endDate: string;
      }>;
    }>;
    experience: {
      years: number;
    };
    contract: {
      birdStatus: number;
      baseYearCompensation: {
        active: number;
      };
      poisonPillProvision: {
        active: boolean;
      };
      incomingTradeValue: number;
      outgoingTradeValue: number;
      minimumSalaryException: boolean;
      optionType: number;
      salary: number;
      salaryRemaining: number;
      yearsRemaining: number;
      season: {
        year: number;
        startDate: string;
        endDate: string;
      };
      tradeKicker: {
        active: boolean;
        percentage: number;
        valuw: number;
        tradeValue: number;
      };
      tradeRestriction: boolean;
      unsignedForeignPick: boolean;
      active: boolean;
    };
    status: {
      id: string;
      name: string;
      type: string;
      abbreviation: string;
    };
  }>;
  coach: Array<{
    id: string;
    firstName: string;
    lastName: string;
    experience: number;
  }>;
  team: {
    id: string;
    abbreviation: string;
    location: string;
    name: string;
    displayName: string;
    clubhouse: string;
    color: string;
    logo: string;
    recordSummary: string;
    seasonSummary: string;
    standingSummary: string;
  };
};
