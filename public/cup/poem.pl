#!/usr/bin/perl
# count words from blog
#
# usage:
#   perl countwords.pl ~/blog/days/2020-06-14.txt  # count for one day
#   perl countpushups.pl 2020-06-1?.txt  # count for a bunch of days
use 5.010;
use strict;
use warnings;
use open qw(:std :utf8); # this is required to read utf8 with <>

use Getopt::Std;

my %options=();
getopts("v:", \%options);

my $verbose = defined $options{v} ? $options{v} : 0;

# daily goals
my $total_goal = 1000;
my $total = 0;
my $total_distinct = 0;

my %count;
while (my $line = <>) {
    chomp $line;
    #$line =~ s/(\p{CJK_Unified_Ideographs})/<$1>/g;
    $line =~ s/(.)/<$1>/g;
    say $line;
}

